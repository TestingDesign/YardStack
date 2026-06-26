const fs = require('fs');
const path = require('path');

const directory = 'c:/Users/mlmma/OneDrive/Documents/GitHub/YardStock/frontend/src/Home';

const replacements = {
  'bg-[#FAFAFA]': 'bg-[var(--color-bg-muted)]',
  'text-slate-900': 'text-[var(--color-text-primary)]',
  'text-slate-800': 'text-[var(--color-text-primary)]',
  'text-slate-700': 'text-[var(--color-text-primary)]',
  'text-slate-600': 'text-[var(--color-text-secondary)]',
  'text-slate-500': 'text-[var(--color-text-secondary)]',
  'text-slate-400': 'text-[var(--color-text-muted)]',
  'border-slate-200': 'border-[var(--color-border-default)]',
  'border-slate-100': 'border-gray-100',
  'bg-slate-50': 'bg-gray-50',
  'bg-slate-950': 'bg-[linear-gradient(175deg,#2a1550_0%,#1A1A2E_30%,#16213E_60%,#1A1A2E_80%,#16213E_100%)]'
};

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk(directory);
let updatedFilesCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  
  for (const [key, value] of Object.entries(replacements)) {
    // Escape brackets for regex if needed, or use string split/join
    content = content.split(key).join(value);
  }
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    updatedFilesCount++;
  }
});

console.log(`Updated ${updatedFilesCount} files.`);
