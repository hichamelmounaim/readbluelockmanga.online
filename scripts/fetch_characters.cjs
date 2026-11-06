const https = require('https');
const fs = require('fs');
const path = require('path');

const charsDir = path.resolve(__dirname, '../public/characters');
if (!fs.existsSync(charsDir)) fs.mkdirSync(charsDir, { recursive: true });

// Top Blue Lock characters with official high quality anime art URLs from Fandom/official sources
const characterList = [
  {
    slug: 'yoichi-isagi',
    name: 'Yoichi Isagi',
    url: 'https://static.wikia.nocookie.net/bluelock/images/d/df/Yoichi_Isagi_Anime_Visual.png/revision/latest?cb=20220812165916'
  },
  {
    slug: 'meguru-bachira',
    name: 'Meguru Bachira',
    url: 'https://static.wikia.nocookie.net/bluelock/images/7/7b/Meguru_Bachira_Anime_Visual.png/revision/latest?cb=20220812165939'
  },
  {
    slug: 'rensuke-kunigami',
    name: 'Rensuke Kunigami',
    url: 'https://static.wikia.nocookie.net/bluelock/images/f/f8/Rensuke_Kunigami_Anime_Visual.png/revision/latest?cb=20220812165957'
  },
  {
    slug: 'hyoma-chigiri',
    name: 'Hyoma Chigiri',
    url: 'https://static.wikia.nocookie.net/bluelock/images/7/77/Hyoma_Chigiri_Anime_Visual.png/revision/latest?cb=20220812170020'
  },
  {
    slug: 'seishiro-nagi',
    name: 'Seishiro Nagi',
    url: 'https://static.wikia.nocookie.net/bluelock/images/8/87/Seishiro_Nagi_Anime_Visual.png/revision/latest?cb=20220812170044'
  },
  {
    slug: 'rin-itoshi',
    name: 'Rin Itoshi',
    url: 'https://static.wikia.nocookie.net/bluelock/images/0/07/Rin_Itoshi_Anime_Visual.png/revision/latest?cb=20221224173837'
  },
  {
    slug: 'shoei-barou',
    name: 'Shoei Barou',
    url: 'https://static.wikia.nocookie.net/bluelock/images/4/46/Shoei_Baro_Anime_Visual.png/revision/latest?cb=20220812170144'
  },
  {
    slug: 'reo-mikage',
    name: 'Reo Mikage',
    url: 'https://static.wikia.nocookie.net/bluelock/images/4/4c/Reo_Mikage_Anime_Visual.png/revision/latest?cb=20220812170104'
  },
  {
    slug: 'jinpachi-ego',
    name: 'Jinpachi Ego',
    url: 'https://static.wikia.nocookie.net/bluelock/images/8/80/Jinpachi_Ego_Anime_Visual.png/revision/latest?cb=20220812170228'
  },
  {
    slug: 'michael-kaiser',
    name: 'Michael Kaiser',
    url: 'https://static.wikia.nocookie.net/bluelock/images/e/e4/Michael_Kaiser_Anime_Visual.png/revision/latest?cb=20240928065537'
  }
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed with HTTP ${res.statusCode}`));
      }
      const fileStream = fs.createWriteStream(dest);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close(resolve);
      });
    }).on('error', reject);
  });
}

async function run() {
  for (const c of characterList) {
    const dest = path.join(charsDir, `${c.slug}.png`);
    try {
      console.log(`Downloading ${c.name}...`);
      await download(c.url, dest);
      console.log(`✓ Saved ${c.slug}.png (${(fs.statSync(dest).size / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.warn(`! Failed ${c.slug}: ${err.message}`);
    }
  }
}

run();
