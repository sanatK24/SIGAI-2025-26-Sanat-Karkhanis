// Script to convert all images in public/img/gallery to .webp
// Usage: node scripts/convert_gallery_to_webp.cjs

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const galleryDir = path.join(__dirname, '../public/img/GALLERY');

fs.readdir(galleryDir, (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    const ext = path.extname(file).toLowerCase();
    if (['.jpg', '.jpeg', '.png'].includes(ext) || ext === '') {
      const inputPath = path.join(galleryDir, file);
      const outputPath = path.join(galleryDir, path.basename(file, ext) + '.webp');
      sharp(inputPath)
        .withMetadata({ orientation: 1 }) // Prevent auto-rotation
        .webp({ quality: 90 })
        .toFile(outputPath)
        .then(() => console.log(`Converted: ${file} -> ${outputPath}`))
        .catch(e => console.error(`Error converting ${file}:`, e));
    }
  });
});
