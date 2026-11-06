const https = require('https');
const fs = require('fs');
const path = require('path');

const query = JSON.stringify({
  query: `query {
    Media(search: "Blue Lock", type: MANGA) {
      characters(perPage: 15, sort: [ROLE, RELEVANCE]) {
        nodes {
          name {
            full
            first
            last
            native
          }
          image {
            large
          }
          description
        }
      }
    }
  }`
});

const req = https.request('https://graphql.anilist.co', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'User-Agent': 'Mozilla/5.0'
  }
}, res => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', async () => {
    try {
      const data = JSON.parse(body);
      const chars = data.data.Media.characters.nodes;
      console.log(`Fetched ${chars.length} characters from AniList!`);

      const charsDir = path.resolve(__dirname, '../public/characters');
      if (!fs.existsSync(charsDir)) fs.mkdirSync(charsDir, { recursive: true });

      const results = [];

      for (const char of chars) {
        const slug = char.name.full.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const imgUrl = char.image.large;
        const localFilename = `${slug}.jpg`;
        const localPath = path.join(charsDir, localFilename);

        console.log(`Downloading ${char.name.full} from ${imgUrl}...`);
        await new Promise((resolve) => {
          https.get(imgUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, dlRes => {
            if (dlRes.statusCode === 200) {
              const fileStream = fs.createWriteStream(localPath);
              dlRes.pipe(fileStream);
              fileStream.on('finish', () => {
                fileStream.close();
                console.log(`✓ Saved ${localFilename}`);
                resolve();
              });
            } else {
              console.warn(`! Failed status ${dlRes.statusCode}`);
              resolve();
            }
          }).on('error', (e) => {
            console.warn(`! Error: ${e.message}`);
            resolve();
          });
        });

        results.push({
          id: slug,
          name: char.name.full,
          japaneseName: char.name.native,
          slug: slug,
          image: `/characters/${localFilename}`,
          description: char.description || ''
        });
      }

      fs.writeFileSync(path.join(__dirname, 'anilist_characters.json'), JSON.stringify(results, null, 2));
      console.log('Finished writing anilist_characters.json!');
    } catch (e) {
      console.error('Error parsing response:', e);
    }
  });
});

req.on('error', (e) => console.error('Req error:', e));
req.write(query);
req.end();
