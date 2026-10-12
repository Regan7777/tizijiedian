const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://tizijiedian.com';

const mockData = fs.readFileSync(path.join(__dirname, '../src/data/mockData.ts'), 'utf8');
const addData = fs.readFileSync(path.join(__dirname, '../src/data/additionalArticles.ts'), 'utf8');
const allText = mockData + '\n' + addData;

function extractArticles(text) {
  const articles = [];
  const regex = /{\s*id:\s*["']([^"']+)["'][\s\S]*?title:\s*["']([^"']+)["'][\s\S]*?slug:\s*["']([^"']+)["'][\s\S]*?(?:publishDate:\s*["']([^"']+)["'])?[\s\S]*?(?:updateDate:\s*["']([^"']+)["'])?[\s\S]*?content:/g;
  let m;
  const seenSlugs = new Set();
  while ((m = regex.exec(text)) !== null) {
    const slug = m[3];
    if (!seenSlugs.has(slug)) {
      seenSlugs.add(slug);
      const pubDate = m[4] || '2026-10-10';
      const updDate = m[5] || pubDate;
      articles.push({ slug, date: updDate });
    }
  }
  return articles;
}

const articles = extractArticles(allText);

const categories = [
  'evaluations',
  'product-details',
  'latest-reviews',
  'compare-specs',
  'tutorials',
  'getting-started',
  'tool-guides',
  'device-setup',
  'troubleshooting',
  'privacy-security',
  'news',
  'risk-warnings',
  'industry-news',
  'scenarios',
  'ai-tools',
  'streaming',
  'cross-border-office',
  'announcements',
  'changelogs'
];

const guides = [
  'top-recommendations',
  'eval-center',
  'performance-comparison'
];

const staticPages = [
  { url: '/', changefreq: 'daily', priority: '1.0' },
  { url: '/blog', changefreq: 'daily', priority: '0.9' },
  { url: '/blog/categories', changefreq: 'weekly', priority: '0.8' },
  { url: '/about', changefreq: 'monthly', priority: '0.5' }
];

const now = new Date().toISOString().split('T')[0];

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

// Static core pages
for (const page of staticPages) {
  xml += `  <url>
    <loc>${DOMAIN}${page.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
}

// Guides
for (const g of guides) {
  xml += `  <url>
    <loc>${DOMAIN}/guides/${g}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>
`;
}

// Categories
for (const c of categories) {
  xml += `  <url>
    <loc>${DOMAIN}/category/${c}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`;
}

// Articles
for (const art of articles) {
  xml += `  <url>
    <loc>${DOMAIN}/blog/${art.slug}</loc>
    <lastmod>${art.date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
}

xml += `</urlset>\n`;

const publicDir = path.join(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml, 'utf8');
console.log(`Successfully generated sitemap.xml with ${staticPages.length + guides.length + categories.length + articles.length} URLs.`);
