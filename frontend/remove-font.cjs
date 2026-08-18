const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      if (f !== 'node_modules' && f !== '.git' && f !== 'dist') walkDir(p, callback);
    } else if (f.endsWith('.tsx') || f.endsWith('.ts')) {
      callback(p);
    }
  });
}

const srcDir = path.join(__dirname, 'src');
let count = 0;

walkDir(srcDir, (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  
  // Remove Tailwind font class variations
  content = content.replace(/ font-\['Outfit',sans-serif\]/g, '');
  content = content.replace(/font-\['Outfit',sans-serif\] /g, '');
  content = content.replace(/font-\['Outfit',sans-serif\]/g, '');
  
  // Remove inline style fontFamily references
  content = content.replace(/, fontFamily: "'Outfit', sans-serif"/g, '');
  content = content.replace(/fontFamily: "'Outfit', sans-serif",?\s*/g, '');
  content = content.replace(/ fontFamily: "'Outfit', sans-serif",/g, '');
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    count++;
    console.log('Fixed:', path.relative(srcDir, filePath));
  }
});

console.log(`\nTotal files fixed: ${count}`);
