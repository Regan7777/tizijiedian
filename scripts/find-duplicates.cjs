const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getHtmlFiles(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

const distDir = path.join(process.cwd(), 'dist');
const files = getHtmlFiles(distDir);

const titleMap = new Map();
const descMap = new Map();

for (const f of files) {
  const rel = path.relative(distDir, f).replace(/\\/g, '/');
  const html = fs.readFileSync(f, 'utf-8');

  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';

  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
  const desc = descMatch ? descMatch[1].trim() : '';

  if (title) {
    if (!titleMap.has(title)) titleMap.set(title, []);
    titleMap.get(title).push(rel);
  }

  if (desc) {
    if (!descMap.has(desc)) descMap.set(desc, []);
    descMap.get(desc).push(rel);
  }
}

console.log('--- DUPLICATE TITLES ---');
let dupTitles = 0;
for (const [title, list] of titleMap.entries()) {
  if (list.length > 1) {
    dupTitles++;
    console.log(`[${list.length} pages] Title: ${title}`);
    console.log('  Pages:', list);
  }
}
if (dupTitles === 0) console.log('None! All titles in dist are unique.');

console.log('\n--- DUPLICATE DESCRIPTIONS ---');
let dupDescs = 0;
for (const [desc, list] of descMap.entries()) {
  if (list.length > 1) {
    dupDescs++;
    console.log(`[${list.length} pages] Desc: ${desc.slice(0, 70)}...`);
    console.log('  Pages:', list);
  }
}
if (dupDescs === 0) console.log('None! All descriptions in dist are unique.');
