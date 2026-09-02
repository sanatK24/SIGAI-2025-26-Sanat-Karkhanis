// scripts/open_all_urls.cjs
// Opens all URLs in the default browser (Windows)
const { exec } = require('child_process');

const BASE_URL = 'http://localhost:3000'; // Change if needed
const urls = [
  '/about',
  '/contact',
  '/events',
  '/events/0',
  '/events/1',
  '/events/10',
  '/events/11',
  '/events/12',
  '/events/13',
  '/events/14',
  '/events/15',
  '/events/16',
  '/events/17',
  '/events/18',
  '/events/19',
  '/events/2',
  '/events/20',
  '/events/21',
  '/events/3',
  '/events/4',
  '/events/5',
  '/events/6',
  '/events/7',
  '/events/8',
  '/events/9',
  '/gallery',
  '/global-error',
  '/latest-issue',
  '/latest-issue/layout',
  '/layout',
  '/page',
  '/team',
];

urls.forEach(url => {
  exec(`start "" "${BASE_URL}${url}"`);
});
