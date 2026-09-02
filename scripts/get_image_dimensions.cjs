// Script to print dimensions of selected images (any format)
// Usage: node scripts/get_image_dimensions.cjs <image1> <image2> ...

const sharp = require('sharp');
const path = require('path');

const fs = require('fs');
const readline = require('readline');
const coreImgDir = path.join(__dirname, '../public/img/gallery');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

fs.readdir(coreImgDir, async (err, files) => {
  if (err) throw err;
  const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ext === '.webp';
  });

  let selected = [];

  for (const file of imageFiles) {
    const answer = await new Promise(resolve => {
      rl.question(`Do you want to print dimensions for ${file}? (y/n): `, resolve);
    });
    if (answer.trim().toLowerCase() === 'y') {
      selected.push(file);
    }
  }

  rl.close();

  selected.forEach(file => {
    const imgPath = path.join(coreImgDir, file);
    sharp(imgPath)
      .metadata()
      .then(meta => {
        console.log(`${file}: ${meta.width} x ${meta.height}`);
      })
      .catch(e => {
        console.error(`Error reading ${file}:`, e.message);
      });
  });
});
