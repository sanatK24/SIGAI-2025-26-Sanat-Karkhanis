// scripts/list_all_urls.js
// Node.js script to list all URLs for a Next.js/React static site
// Scans the 'pages' and 'app' directories for routes

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', 'src');
const ROUTE_DIRS = ['pages', 'app'];

function isDynamicSegment(segment) {
  return segment.startsWith('[') && segment.endsWith(']');
}

function walk(dir, base = '') {
  let urls = [];
  const entries = fs.existsSync(dir) ? fs.readdirSync(dir) : [];
  for (const entry of entries) {
    if (entry.startsWith('_') || entry.startsWith('.')) continue;
    const full = path.join(dir, entry);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      urls = urls.concat(walk(full, path.join(base, entry)));
    } else if (entry.endsWith('.tsx') || entry.endsWith('.js') || entry.endsWith('.mdx')) {
      let url = path.join(base, entry)
        .replace(/\\/g, '/')
        .replace(/\.(tsx|js|mdx)$/, '')
        .replace(/\/page$/, '')
        .replace(/\/index$/, '');
      if (url === '') url = '/';
      else url = '/' + url;
      // Remove dynamic segments for static listing
      if (!url.includes('[')) {
        urls.push(url);
      }
    }
  }
  return urls;
}

let allUrls = [];
for (const dir of ROUTE_DIRS) {
  const fullDir = path.join(ROOT, dir);
  if (fs.existsSync(fullDir)) {
    allUrls = allUrls.concat(walk(fullDir));
  }
}

// Remove duplicates and sort
allUrls = Array.from(new Set(allUrls)).sort();

console.log('All static URLs in the site:');
allUrls.forEach((url) => console.log(url));
