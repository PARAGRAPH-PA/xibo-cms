const fs = require('fs');
const path = require('path');

const userUploadedDir = path.join(
  process.env.USERPROFILE || 'C:\\Users\\ETHEREAL浪岡',
  '.gemini\\antigravity-ide\\brain\\54c6f3f4-b5c6-4656-8d74-db86876195aa\\.user_uploaded'
);

const srcLogo = path.join(userUploadedDir, 'media_1787383912371.png');
const srcIcon = path.join(userUploadedDir, 'media_1787383912553.png');

console.log('Source Logo exists:', fs.existsSync(srcLogo));
console.log('Source Icon exists:', fs.existsSync(srcIcon));

const targets = [
  // 1. library/brand
  { src: srcLogo, dest: 'd:\\develop\\xibo4.5.1\\library\\brand\\logo.png' },
  { src: srcLogo, dest: 'd:\\develop\\xibo4.5.1\\library\\brand\\logo-dark.png' },
  { src: srcIcon, dest: 'd:\\develop\\xibo4.5.1\\library\\brand\\logo-icon.png' },
  { src: srcIcon, dest: 'd:\\develop\\xibo4.5.1\\library\\brand\\favicon.ico' },
  { src: srcIcon, dest: 'd:\\develop\\xibo4.5.1\\library\\brand\\favicon.png' },
  { src: srcIcon, dest: 'd:\\develop\\xibo4.5.1\\library\\brand\\192x192.png' },
  { src: srcIcon, dest: 'd:\\develop\\xibo4.5.1\\library\\brand\\512x512.png' },

  // 2. docker/brand
  { src: srcLogo, dest: 'd:\\develop\\xibo4.5.1\\docker\\brand\\logo.png' },
  { src: srcLogo, dest: 'd:\\develop\\xibo4.5.1\\docker\\brand\\logo-dark.png' },
  { src: srcIcon, dest: 'd:\\develop\\xibo4.5.1\\docker\\brand\\logo-icon.png' },
  { src: srcIcon, dest: 'd:\\develop\\xibo4.5.1\\docker\\brand\\favicon.ico' },
  { src: srcIcon, dest: 'd:\\develop\\xibo4.5.1\\docker\\brand\\favicon.png' },
  { src: srcIcon, dest: 'd:\\develop\\xibo4.5.1\\docker\\brand\\192x192.png' },
  { src: srcIcon, dest: 'd:\\develop\\xibo4.5.1\\docker\\brand\\512x512.png' },

  // 3. frontend / web
  { src: srcIcon, dest: 'd:\\develop\\xibo4.5.1\\web\\favicon.ico' },
  { src: srcIcon, dest: 'd:\\develop\\xibo4.5.1\\web\\app\\favicon.ico' },
  { src: srcIcon, dest: 'd:\\develop\\xibo4.5.1\\frontend\\public\\favicon.ico' },
  { src: srcLogo, dest: 'd:\\develop\\xibo4.5.1\\frontend\\public\\brand\\logo.png' },
  { src: srcIcon, dest: 'd:\\develop\\xibo4.5.1\\frontend\\public\\brand\\logo-icon.png' }
];

targets.forEach(({ src, dest }) => {
  const dir = path.dirname(dest);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.copyFileSync(src, dest);
  console.log(`[Copied] -> ${dest}`);
});

// 古いSVGの削除（PNGを優先認識させる）
const svgsToRemove = [
  'd:\\develop\\xibo4.5.1\\library\\brand\\logo.svg',
  'd:\\develop\\xibo4.5.1\\library\\brand\\logo-dark.svg',
  'd:\\develop\\xibo4.5.1\\library\\brand\\logo-icon.svg',
  'd:\\develop\\xibo4.5.1\\docker\\brand\\logo.svg',
  'd:\\develop\\xibo4.5.1\\docker\\brand\\logo-dark.svg',
  'd:\\develop\\xibo4.5.1\\docker\\brand\\logo-icon.svg'
];

svgsToRemove.forEach((p) => {
  if (fs.existsSync(p)) {
    fs.unlinkSync(p);
    console.log(`[Removed old SVG] -> ${p}`);
  }
});

console.log('All brand assets successfully updated!');
