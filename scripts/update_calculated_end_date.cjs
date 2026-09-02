// update_calculated_end_date.js
// Usage: node update_calculated_end_date.js
// This script updates the calculated_end_date for each event in events_local.json

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../public/data/events_local.json');

function addDays(dateStr, days) {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const updated = data.map(event => {
  let calculated_end_date = event.calculated_end_date;
  // Ensure 1-day events are handled correctly
  if (event.start_date && event.duration_days) {
    // duration_days of 1 means end date is start date
    calculated_end_date = addDays(event.start_date, event.duration_days - 1);
  } else if (event.end_date) {
    calculated_end_date = event.end_date;
  }
  return { ...event, calculated_end_date };
});

fs.writeFileSync(filePath, JSON.stringify(updated, null, 2));
console.log('calculated_end_date updated for all events.');
