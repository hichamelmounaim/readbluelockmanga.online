const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://www.readbluelockmanga.online';

// Read characters and chapters dynamically
let characterSlugs = [];
let chaptersCount = 0;

try {
  const constantsPath = path.join(__dirname, '../constants.ts');
  const constantsContent = fs.readFileSync(constantsPath, 'utf-8');
  
  const slugRegex = /"slug":\s*"([^"]+)"/g;
  let match;
  while ((match = slugRegex.exec(constantsContent)) !== null) {
    characterSlugs.push(match[1]);
  }
} catch (e) {
  console.error('Could not read constants.ts', e);
}

try {
  const files = fs.readdirSync(path.join(__dirname, '..'));
  const scrapedFile = files.find(f => f.startsWith('scraped_') && f.endsWith('.json'));
  if (scrapedFile) {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, '..', scrapedFile), 'utf-8'));
    if (data.chapters) {
      chaptersCount = data.chapters.length;
    }
  }
} catch (e) {
  console.error('Could not read scraped JSON', e);
}

// Fallback if not found
if (chaptersCount === 0) chaptersCount = 100;

const chapters = Array.from({ length: chaptersCount }, (_, i) => i + 1);

const pages = [
  '',
  '/manga',
  '/characters',
  '/privacy',
  '/dmca',
  '/disclaimer',
  '/about',
  '/terms'
];

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

pages.forEach(page => {
  sitemap += `  <url>\n    <loc>${DOMAIN}${page}</loc>\n    <changefreq>daily</changefreq>\n    <priority>${page === '' ? '1.0' : '0.8'}</priority>\n  </url>\n`;
});

chapters.forEach(num => {
  sitemap += `  <url>\n    <loc>${DOMAIN}/chapter/${num}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;
});

characterSlugs.forEach(slug => {
  sitemap += `  <url>\n    <loc>${DOMAIN}/characters/${slug}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.85</priority>\n  </url>\n`;
});

sitemap += `</urlset>`;

const publicDir = path.join(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
console.log(`Sitemap generated with ${pages.length + chapters.length + characterSlugs.length} URLs for readbluelockmanga.online`);
