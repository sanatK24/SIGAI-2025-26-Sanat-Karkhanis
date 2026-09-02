#!/usr/bin/env node
/**
 * Script to update Firebase config settings in all files in the codebase.
 * Usage: node update-firebase-config.cjs <key1>=<value1> <key2>=<value2> ...
 * Example: node update-firebase-config.cjs apiKey=NEW_KEY projectId=NEW_ID
 */

const fs = require('fs');
const path = require('path');


// Paste your Firebase config object here if you want to update all files with these values:
// Example:
// const CONFIG = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_STORAGE_BUCKET",
//   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//   appId: "YOUR_APP_ID",
//   measurementId: "YOUR_MEASUREMENT_ID"
// };
const CONFIG = {
  apiKey: "AIzaSyD71xxKma112v9XYlbcrIHn-t50jZ3YbmI",
  authDomain: "sigaibackend.firebaseapp.com",
  projectId: "sigaibackend",
  storageBucket: "sigaibackend.firebasestorage.app",
  messagingSenderId: "817943217733",
  appId: "1:817943217733:web:30fc298499cbe64b54052c"
};

const CONFIG_KEYS = [
  'apiKey',
  'authDomain',
  'projectId',
  'storageBucket',
  'messagingSenderId',
  'appId',
  'measurementId',
];


// Parse CLI args or use CONFIG
let updates = {};
process.argv.slice(2).forEach(arg => {
  const [key, value] = arg.split('=');
  if (CONFIG_KEYS.includes(key) && value) {
    updates[key] = value;
  }
});
if (Object.keys(updates).length === 0 && Object.keys(CONFIG).length > 0) {
  updates = { ...CONFIG };
}
if (Object.keys(updates).length === 0) {
  console.error('No valid Firebase config keys provided (none in CLI or CONFIG).');
  process.exit(1);
}

// Recursively find all files in the workspace
function findAllFiles(dir, fileList = []) {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findAllFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });
  return fileList;
}

// Update config in a file
function updateConfigInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  CONFIG_KEYS.forEach(key => {
    if (updates[key]) {
      // Regex for JS/TS/JSON: key: "..." or key: '...' or key: `...`
      // Only match inside firebaseConfig object
      // Handles: key: "...", key: '...', key: `...`
      const regex = new RegExp('(' + key + '\\s*:\\s*)(["\'`])([^"\'`]+)(["\'`])', 'g');
      content = content.replace(regex, (match, p1, p2, p3, p4) => {
        changed = true;
        return p1 + p2 + updates[key] + p4;
      });
    }
  });
  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

// Main
const rootDir = process.cwd();
const allFiles = findAllFiles(rootDir);
allFiles.forEach(file => {
  // Only update JS, TS, JSON, and env files
  if (/(\.js|\.ts|\.json|\.env)$/i.test(file)) {
    updateConfigInFile(file);
  }
});

console.log('Firebase config update complete.');
