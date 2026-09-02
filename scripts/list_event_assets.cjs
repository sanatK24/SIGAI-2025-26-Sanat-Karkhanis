// Node.js script to list all image and PDF file locations referenced in events_local.json
const fs = require('fs');
const path = require('path');

const eventsPath = path.join(__dirname, '../public/data/events_local.json');
const imgRoot = path.join(__dirname, '../public/img');
const pdfRoot = path.join(__dirname, '../public');

const events = JSON.parse(fs.readFileSync(eventsPath, 'utf8'));

const imageFiles = [];
const pdfFiles = [];


for (const event of events) {
  // Collect all possible image fields
  const imageFields = [
    'image',
    'agenda_image',
    'event_homepage_image',
    'event_template_image'
  ];
  for (const field of imageFields) {
    if (event[field]) {
      imageFiles.push(event[field]);
    }
  }
  // Check for magazine PDF or other PDFs
  if (event.category && event.category.toLowerCase().includes('magazine')) {
    // Convention: PDF named after event title or SYNARA_2025.pdf
    pdfFiles.push('/public/SYNARA_2025.pdf');
  }
}

console.log('Referenced Images:');
imageFiles.forEach(f => console.log(f));
console.log('\nReferenced PDFs:');
pdfFiles.forEach(f => console.log(f));

console.log('\nTotal Images:', imageFiles.length);
console.log('Total PDFs:', pdfFiles.length);
