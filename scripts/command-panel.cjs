const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const ROOT_DIR = path.resolve(__dirname, '..');
const PACKAGE_JSON_PATH = path.join(ROOT_DIR, 'package.json');
const SCRIPTS_DIR = path.join(ROOT_DIR, 'scripts');
const PORT = Number(process.env.COMMAND_PANEL_PORT || 4789);

const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf8'));
const npmScripts = Object.entries(packageJson.scripts || {})
    .filter(([name]) => name !== 'command-panel')
    .map(([name, command]) => ({
        id: `npm:${name}`,
        label: `npm run ${name}`,
        command: `npm run ${name}`,
        runner: 'npm',
        target: name,
        source: `package.json -> scripts.${name}`,
        raw: String(command),
    }));

const scriptFiles = fs
    .readdirSync(SCRIPTS_DIR)
    .filter((fileName) => /\.(cjs|js)$/i.test(fileName) && fileName !== 'command-panel.cjs')
    .sort((a, b) => a.localeCompare(b))
    .map((fileName) => ({
        id: `script:${fileName}`,
        label: `node scripts/${fileName}`,
        command: `node scripts/${fileName}`,
        runner: 'node',
        target: path.join('scripts', fileName),
        source: 'scripts folder',
        raw: fileName,
    }));

const commands = [...npmScripts, ...scriptFiles];
const commandIndex = new Map(commands.map((command) => [command.id, command]));
const stateByCommandId = new Map();
const streamClients = new Set();

console.log(`Loaded ${npmScripts.length} npm scripts and ${scriptFiles.length} script files`);
if (commands.length === 0) {
    console.warn('Warning: No commands detected!');
} else {
    console.log('Available commands:');
    commands.forEach((cmd) => console.log(`  - ${cmd.label}`));
}

for (const command of commands) {
    stateByCommandId.set(command.id, {
        running: false,
        pid: null,
        startTime: null,
        lastExitCode: null,
        lastExitSignal: null,
        child: null,
        stopping: false,
    });
}

function nowIso() {
    return new Date().toISOString();
}

function getPublicState(commandId) {
    const state = stateByCommandId.get(commandId);
    if (!state) {
        return null;
    }

    return {
        running: state.running,
        pid: state.pid,
        startTime: state.startTime,
        lastExitCode: state.lastExitCode,
        lastExitSignal: state.lastExitSignal,
        stopping: state.stopping,
    };
}

function buildPayload() {
    return commands.map((command) => ({
        ...command,
        state: getPublicState(command.id),
    }));
}

function sendJson(res, code, data) {
    res.writeHead(code, {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
    });
    res.end(JSON.stringify(data));
}

function readJsonBody(req) {
    return new Promise((resolve, reject) => {
        let raw = '';

        req.on('data', (chunk) => {
            raw += chunk;
            if (raw.length > 1_000_000) {
                reject(new Error('Payload too large'));
            }
        });

        req.on('end', () => {
            if (!raw.trim()) {
                resolve({});
                return;
            }

            try {
                resolve(JSON.parse(raw));
            } catch (error) {
                reject(new Error('Invalid JSON payload'));
            }
        });

        req.on('error', reject);
    });
}

function broadcast(event) {
    const payload = `data: ${JSON.stringify(event)}\n\n`;

    for (const client of streamClients) {
        client.write(payload);
    }
}

function terminateProcessTree(pid) {
    return new Promise((resolve) => {
        if (!pid) {
            resolve();
            return;
        }

        if (process.platform === 'win32') {
            const killer = spawn('taskkill', ['/pid', String(pid), '/t', '/f'], {
                stdio: 'ignore',
                windowsHide: true,
            });

            killer.on('exit', () => resolve());
            killer.on('error', () => resolve());
            return;
        }

        try {
            process.kill(pid, 'SIGINT');
            setTimeout(() => {
                try {
                    process.kill(pid, 'SIGKILL');
                } catch (_) {
                    // No-op: the process likely exited after SIGINT.
                }
                resolve();
            }, 1500);
        } catch (_) {
            resolve();
        }
    });
}

async function stopCommand(commandId) {
    const state = stateByCommandId.get(commandId);

    if (!state) {
        throw new Error('Unknown command id');
    }

    if (!state.running || !state.child) {
        return { alreadyStopped: true };
    }

    state.stopping = true;
    broadcast({
        type: 'status',
        commandId,
        state: getPublicState(commandId),
        timestamp: nowIso(),
    });

    await terminateProcessTree(state.pid);

    return { alreadyStopped: false };
}

function startCommand(commandId) {
    const command = commandIndex.get(commandId);
    const state = stateByCommandId.get(commandId);

    if (!command || !state) {
        throw new Error('Unknown command id');
    }

    if (state.running) {
        return { alreadyRunning: true, state: getPublicState(commandId) };
    }

    const child =
        command.runner === 'npm'
            ? spawn('npm', ['run', command.target], {
                  cwd: ROOT_DIR,
                  shell: true,
                  windowsHide: true,
              })
            : spawn('node', [command.target], {
                  cwd: ROOT_DIR,
                  shell: true,
                  windowsHide: true,
              });

    state.child = child;
    state.running = true;
    state.stopping = false;
    state.pid = child.pid || null;
    state.startTime = nowIso();
    state.lastExitCode = null;
    state.lastExitSignal = null;

    broadcast({
        type: 'status',
        commandId,
        state: getPublicState(commandId),
        timestamp: nowIso(),
    });
    broadcast({
        type: 'output',
        commandId,
        stream: 'system',
        text: `[${nowIso()}] Started ${command.command} (pid ${state.pid || 'n/a'})\n`,
    });

    child.stdout.on('data', (chunk) => {
        broadcast({
            type: 'output',
            commandId,
            stream: 'stdout',
            text: String(chunk),
        });
    });

    child.stderr.on('data', (chunk) => {
        broadcast({
            type: 'output',
            commandId,
            stream: 'stderr',
            text: String(chunk),
        });
    });

    child.on('error', (error) => {
        broadcast({
            type: 'output',
            commandId,
            stream: 'stderr',
            text: `[${nowIso()}] Process error: ${error.message}\n`,
        });
    });

    child.on('close', (code, signal) => {
        state.running = false;
        state.stopping = false;
        state.pid = null;
        state.child = null;
        state.lastExitCode = code;
        state.lastExitSignal = signal;

        broadcast({
            type: 'status',
            commandId,
            state: getPublicState(commandId),
            timestamp: nowIso(),
        });
        broadcast({
            type: 'output',
            commandId,
            stream: 'system',
            text: `[${nowIso()}] Exited with code ${String(code)} signal ${String(signal)}\n`,
        });
    });

    return { alreadyRunning: false, state: getPublicState(commandId) };
}

function renderAppHtml() {
    return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Command Panel</title>
  <style>
    :root {
      --bg-0: #f6f8fb;
      --bg-1: #ffffff;
      --card: #ffffff;
      --text: #112032;
      --muted: #5a6a7d;
      --line: #d8e0eb;
      --ok: #1a7f45;
      --warn: #9c6b07;
      --err: #b42318;
      --btn: #154a8f;
      --btn-hover: #0f3b74;
      --btn-stop: #8f1d2e;
      --btn-stop-hover: #731625;
      --mono: "Cascadia Code", "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
      --sans: "Segoe UI", "Trebuchet MS", Verdana, sans-serif;
    }

    * { box-sizing: border-box; }

    body {
      margin: 0;
      font-family: var(--sans);
      color: var(--text);
      background:
        radial-gradient(circle at 10% 20%, rgba(21,74,143,0.12), transparent 25%),
        radial-gradient(circle at 90% 10%, rgba(26,127,69,0.12), transparent 20%),
        linear-gradient(140deg, var(--bg-0), #eef3f9 40%, #f8fafc);
      min-height: 100vh;
    }

    .container {
      width: min(1200px, 95vw);
      margin: 24px auto 32px;
    }

    .top {
      background: var(--bg-1);
      border: 1px solid var(--line);
      border-radius: 16px;
      padding: 16px;
      box-shadow: 0 8px 24px rgba(0, 20, 40, 0.08);
      margin-bottom: 16px;
    }

    h1 {
      margin: 0;
      font-size: 1.45rem;
      letter-spacing: 0.2px;
    }

    .sub {
      margin-top: 6px;
      color: var(--muted);
      font-size: 0.95rem;
    }

    .grid {
      display: grid;
      gap: 14px;
      grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
    }

    .card {
      background: var(--card);
      border: 1px solid var(--line);
      border-radius: 14px;
      overflow: hidden;
      box-shadow: 0 6px 18px rgba(0, 20, 40, 0.06);
      display: flex;
      flex-direction: column;
      min-height: 280px;
    }

    .head {
      padding: 12px 14px;
      border-bottom: 1px solid var(--line);
      display: grid;
      gap: 6px;
    }

    .name {
      font-weight: 700;
      font-size: 0.98rem;
      line-height: 1.25;
      word-break: break-all;
    }

    .meta {
      color: var(--muted);
      font-size: 0.84rem;
      font-family: var(--mono);
      word-break: break-all;
    }

    .row {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .badge {
      border-radius: 999px;
      padding: 3px 9px;
      font-size: 0.72rem;
      font-weight: 700;
      border: 1px solid var(--line);
      background: #f4f7fb;
      color: #243447;
    }

    .badge.running { background: #e8f6ee; color: var(--ok); border-color: #bee3cd; }
    .badge.stopping { background: #fff6df; color: var(--warn); border-color: #f3dda2; }
    .badge.stopped { background: #f3f4f6; color: #3b4754; }

    .controls {
      padding: 10px 14px;
      border-bottom: 1px solid var(--line);
      display: flex;
      gap: 8px;
    }

    button {
      border: 0;
      border-radius: 10px;
      padding: 8px 12px;
      color: white;
      background: var(--btn);
      font-weight: 700;
      cursor: pointer;
      transition: transform 120ms ease, background 120ms ease;
    }

    button:hover { transform: translateY(-1px); background: var(--btn-hover); }
    button:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }

    .stop {
      background: var(--btn-stop);
    }

    .stop:hover {
      background: var(--btn-stop-hover);
    }

    .log {
      margin: 0;
      flex: 1;
      background: #09111a;
      color: #d7e0ea;
      font-family: var(--mono);
      font-size: 0.8rem;
      line-height: 1.4;
      padding: 10px 12px;
      overflow: auto;
      white-space: pre-wrap;
      word-break: break-word;
      min-height: 180px;
      max-height: 380px;
    }

    .line-system { color: #8ab5ff; }
    .line-stdout { color: #d7e0ea; }
    .line-stderr { color: #ff9aa4; }

    @media (max-width: 680px) {
      .container { width: min(100%, 96vw); margin-top: 12px; }
      .grid { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <div class="container">
    <section class="top">
      <h1>Command Panel</h1>
      <div class="sub">Click start to run commands and click stop to interrupt them. Console output streams live below each command.</div>
    </section>
    <section class="grid" id="commands"></section>
  </div>

  <script>
    const commandMap = new Map();

    function statusClass(state) {
      if (!state) return 'stopped';
      if (state.stopping) return 'stopping';
      return state.running ? 'running' : 'stopped';
    }

    function statusText(state) {
      if (!state) return 'Stopped';
      if (state.stopping) return 'Stopping';
      return state.running ? 'Running' : 'Stopped';
    }

    function escapeHtml(text) {
      return text
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;');
    }

    function appendLog(commandId, stream, text) {
      const refs = commandMap.get(commandId);
      if (!refs) return;

      const div = document.createElement('div');
      div.className = 'line-' + stream;
      div.innerHTML = escapeHtml(text);
      refs.log.appendChild(div);
      refs.log.scrollTop = refs.log.scrollHeight;
    }

    function updateCardState(commandId, state) {
      const refs = commandMap.get(commandId);
      if (!refs) return;

      refs.state = state;
      refs.badge.className = 'badge ' + statusClass(state);
      refs.badge.textContent = statusText(state);
      refs.run.disabled = !!state && state.running;
      refs.stop.disabled = !state || (!state.running && !state.stopping);
    }

    function createCard(command) {
      const card = document.createElement('article');
      card.className = 'card';

      const head = document.createElement('div');
      head.className = 'head';

      const name = document.createElement('div');
      name.className = 'name';
      name.textContent = command.label;

      const meta = document.createElement('div');
      meta.className = 'meta';
      meta.textContent = command.command;

      const row = document.createElement('div');
      row.className = 'row';

      const badge = document.createElement('span');
      badge.className = 'badge';
      badge.textContent = 'Stopped';

      row.appendChild(badge);
      head.appendChild(name);
      head.appendChild(meta);
      head.appendChild(row);

      const controls = document.createElement('div');
      controls.className = 'controls';

      const run = document.createElement('button');
      run.textContent = 'Run';

      const stop = document.createElement('button');
      stop.className = 'stop';
      stop.textContent = 'Stop';

      const log = document.createElement('pre');
      log.className = 'log';

      controls.appendChild(run);
      controls.appendChild(stop);
      card.appendChild(head);
      card.appendChild(controls);
      card.appendChild(log);

      run.addEventListener('click', async () => {
        await fetch('/api/start', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ commandId: command.id }),
        });
      });

      stop.addEventListener('click', async () => {
        await fetch('/api/stop', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ commandId: command.id }),
        });
      });

      commandMap.set(command.id, { run, stop, log, badge, state: command.state || null });
      updateCardState(command.id, command.state || null);

      if (command.state && command.state.running) {
        appendLog(command.id, 'system', '[restored] command was running when this page loaded\\n');
      }

      return card;
    }

    async function init() {
      try {
        const response = await fetch('/api/commands');
        console.log('Fetch response status:', response.status);
        
        if (!response.ok) {
          throw new Error('HTTP ' + response.status);
        }
        
        const payload = await response.json();
        console.log('Received payload:', payload);
        
        const root = document.getElementById('commands');

        if (!payload.commands || payload.commands.length === 0) {
          root.innerHTML = '<p style="padding: 20px; color: red;">No commands found. Check server logs.</p>';
          return;
        }

        payload.commands.forEach((command) => {
          root.appendChild(createCard(command));
        });

        const stream = new EventSource('/api/stream');
        stream.onmessage = (event) => {
          const data = JSON.parse(event.data);

          if (data.type === 'status') {
            updateCardState(data.commandId, data.state);
            return;
          }

          if (data.type === 'output') {
            appendLog(data.commandId, data.stream, data.text);
          }
        };

        stream.onerror = () => {
          commandMap.forEach((_, commandId) => {
            appendLog(commandId, 'stderr', '[connection] stream disconnected, retrying...\\n');
          });
        };
      } catch (error) {
        console.error('Init error:', error);
        const root = document.getElementById('commands');
        root.innerHTML = '<p style="padding: 20px; color: red;">Error: ' + String(error.message || error) + '</p>';
      }
    }

    init();
  </script>
</body>
</html>`;
}

const appHtml = renderAppHtml();

const server = http.createServer(async (req, res) => {
    try {
        const { method, url } = req;

        if (method === 'GET' && url === '/') {
            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8',
                'Cache-Control': 'no-store',
            });
            res.end(appHtml);
            return;
        }

        if (method === 'GET' && url === '/api/commands') {
            console.log('API: Fetching commands');
            const payload = buildPayload();
            console.log(`API: Returning ${payload.length} commands`);
            sendJson(res, 200, { commands: payload });
            return;
        }

        if (method === 'GET' && url === '/api/stream') {
            res.writeHead(200, {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache, no-transform',
                Connection: 'keep-alive',
                'X-Accel-Buffering': 'no',
            });
            res.write('\n');
            streamClients.add(res);

            const keepAlive = setInterval(() => {
                res.write(': ping\n\n');
            }, 20_000);

            req.on('close', () => {
                clearInterval(keepAlive);
                streamClients.delete(res);
            });

            return;
        }

        if (method === 'POST' && url === '/api/start') {
            const body = await readJsonBody(req);
            const commandId = body.commandId;

            if (!commandIndex.has(commandId)) {
                sendJson(res, 404, { ok: false, error: 'Unknown command id' });
                return;
            }

            const result = startCommand(commandId);
            sendJson(res, 200, { ok: true, ...result });
            return;
        }

        if (method === 'POST' && url === '/api/stop') {
            const body = await readJsonBody(req);
            const commandId = body.commandId;

            if (!commandIndex.has(commandId)) {
                sendJson(res, 404, { ok: false, error: 'Unknown command id' });
                return;
            }

            const result = await stopCommand(commandId);
            sendJson(res, 200, { ok: true, ...result, state: getPublicState(commandId) });
            return;
        }

        sendJson(res, 404, { ok: false, error: 'Not found' });
    } catch (error) {
        sendJson(res, 500, {
            ok: false,
            error: error && error.message ? error.message : 'Unknown server error',
        });
    }
});

server.listen(PORT, () => {
    console.log(`Command panel running at http://localhost:${PORT}`);
    console.log('Open this URL in your browser to run and stop commands with live logs.');
});

process.on('SIGINT', async () => {
    console.log('\nShutting down command panel...');

    for (const command of commands) {
        const state = stateByCommandId.get(command.id);
        if (state && state.running) {
            await stopCommand(command.id);
        }
    }

    process.exit(0);
});
