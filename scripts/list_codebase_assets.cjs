// Node.js script to list all key file and folder locations for features described in the project
const path = require('path');

const locations = [
  // Firestore features
  'src/components/sections/agenda-section.tsx',
  // JSON fetching
  'public/data/faculty.json',
  'public/data/currentCoreTeam.json',
  'public/data/currentLeadership.json',
  'public/data/events_local.json',
  'public/data/youtube.json',
  // Images
  'public/img/',
  'public/img/core_img/',
  'public/img/esp/',
  'public/img/events/',
  'public/img/faculty_img/',
  'public/img/gallery/',
  'public/img/portfolio/',
  'public/img/Sigai Events/',
  'public/img/team/',
  'public/img/testimonials/',
  // YouTube thumbnails (external)
  'https://img.youtube.com/vi/[id]/hqdefault.jpg',
  // PDFs
  'src/lib/generateTicket.ts',
  'src/lib/pdfUtils.ts',
  'public/pdf.worker.min.js',
  'public/SYNARA_2025.pdf',
  // PDF flipbook
  'src/components/pdf-flipbook/',
  // Scripts
  'scripts/add_instagram_posts.cjs',
  'scripts/clean_and_fix_events.cjs',
  'scripts/convert_gallery_to_webp.cjs',
  'scripts/generate_event_pages.cjs',
  'scripts/populate_event_list.cjs',
  'scripts/update_calculated_end_date.cjs',
];

console.log('Key file and folder locations in the codebase:');
locations.forEach(loc => console.log(loc));
