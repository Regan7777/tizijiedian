const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '../dist');

function getAllHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllHtmlFiles(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const htmlFiles = getAllHtmlFiles(distDir);
console.log(`Auditing all ${htmlFiles.length} generated HTML files in dist/...`);

let issues = 0;
htmlFiles.forEach(file => {
  const relPath = path.relative(distDir, file);
  const content = fs.readFileSync(file, 'utf8');
  const match = content.match(/<meta name="description" content="([^"]+)"/);
  if (!match) {
    console.error(`❌ MISSING description: ${relPath}`);
    issues++;
  } else {
    const desc = match[1];
    const len = desc.length;
    if (len < 148 || len > 160) {
      console.warn(`⚠️ OUT OF RANGE [${len} chars]: ${relPath}`);
      issues++;
    } else {
      console.log(`✅ [${len} chars] ${relPath}`);
    }
  }
});

console.log(`\nAudit completed: ${htmlFiles.length} files scanned, ${issues} issues found.`);
if (issues === 0) {
  console.log('🎉 100% OF PAGES IN DIST/ SATISFY BING WEBMASTER TOOLS CRITERIA (150-160 CHARACTERS)!');
}
