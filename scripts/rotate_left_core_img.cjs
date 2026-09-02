// Script to rotate all images in public/img/core_img 90 degrees left (counterclockwise)
// Usage: node scripts/rotate_left_core_img.cjs

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const galleryDir = path.join(__dirname, '../public/img/core_img');

const filesToRotate = [
  'hiresh_chair.webp',
  'aastha_vc.webp'
];

filesToRotate.forEach(file => {
  const inputPath = path.join(galleryDir, file);
  const ext = path.extname(file).toLowerCase();
  if ([ '.jpg', '.jpeg', '.png', '.webp' ].includes(ext) || ext === '') {
    const outputPath = path.join(galleryDir, path.basename(file, ext) + '_rotated.webp');
    sharp(inputPath)
      .rotate(-90) // Rotate left (counterclockwise)
      .webp({ quality: 90 })
      .toFile(outputPath)
      .then(() => console.log(`Rotated left: ${file} -> ${outputPath}`))
      .catch(e => console.error(`Error rotating ${file}:`, e));
  }
});
