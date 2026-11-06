// Builds public/sitemap.xml (and dist/sitemap.xml if dist exists).
// Only indexable pages go in: placeholder chapters with no pages (noindex) are left out.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE_URL } from '../utils/seo-core.js';
import { CHARACTERS_DATA } from '../data/characters.js';
import { GUIDES } from '../data/guides.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const chaptersFile = path.join(root, 'public/data/chapters.json');
const chapters = fs.existsSync(chaptersFile) ? JSON.parse(fs.readFileSync(chaptersFile, 'utf8')) : [];
const today = new Date().toISOString().split('T')[0];

const urls = [];
const add = (loc, lastmod) => urls.push({ loc: `${SITE_URL}${loc}`, lastmod });

// Home + chapter list change whenever a chapter is added, so they get today's date.
// Other lastmod values are left out on purpose: Google only trusts lastmod when it is accurate.
add('/', today);
add('/manga', today);
add('/characters');
for (const c of CHARACTERS_DATA) add(`/characters/${c.slug}`);
for (const route of Object.keys(GUIDES)) add(route);
for (const ch of [...chapters].sort((a, b) => a.number - b.number)) {
  if ((ch.pageCount ?? 0) > 0) add(`/chapter/${ch.number}`);
}
for (const p of ['/about', '/privacy', '/terms', '/dmca', '/disclaimer']) add(p);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>\n    <loc>${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''}\n  </url>`).join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(root, 'public/sitemap.xml'), xml);
const distDir = path.join(root, 'dist');
if (fs.existsSync(distDir)) fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml);
console.log(`[OK] Sitemap generated with ${urls.length} URLs for ${SITE_URL}`);
