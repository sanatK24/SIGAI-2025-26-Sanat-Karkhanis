// clean_and_fix_events.js
// Usage: node clean_and_fix_events.js
// Removes all end_date fields and recalculates calculated_end_date for each event

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
  // Remove end_date and date fields
  const { end_date, date, ...rest } = event;
  // Fix calculated_end_date
  let calculated_end_date = rest.calculated_end_date;
  if (rest.start_date && rest.duration_days) {
    calculated_end_date = addDays(rest.start_date, rest.duration_days - 1);
  }
  return { ...rest, calculated_end_date };
});

fs.writeFileSync(filePath, JSON.stringify(updated, null, 2));
console.log('Removed end_date and fixed calculated_end_date for all events.');
