// Script to list all events with duplicate idx and their titles, showing number of occurrences
// Usage: node scripts/list_duplicate_event_idx.cjs

const fs = require('fs');
const path = require('path');

const eventsPath = path.join(__dirname, '../public/data/events_local.json');
const events = JSON.parse(fs.readFileSync(eventsPath, 'utf-8'));

const idxMap = new Map();

for (const event of events) {
  if (!event.idx) continue;
  if (!idxMap.has(event.idx)) {
    idxMap.set(event.idx, []);
  }
  idxMap.get(event.idx).push(event.title);
}

let found = false;
for (const [idx, titles] of idxMap.entries()) {
  if (titles.length > 1) {
    found = true;
    // Print in the requested style
    console.log(`${idx}. ${titles[0]} (${titles.length})`);
    // Optionally, print all titles if they differ
    for (let i = 1; i < titles.length; i++) {
      if (titles[i] !== titles[0]) {
        console.log(`   - ${titles[i]}`);
      }
    }
  }
}
if (!found) {
  console.log('No duplicate idx found.');
}
