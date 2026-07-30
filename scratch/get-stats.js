const https = require('https');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  try {
    const contribsHtml = await fetchUrl('https://github.com/users/vardzz/contributions');
    // Look for text matching "contributions in the last year"
    const match = contribsHtml.match(/(\d+,?\d*)\s+contributions/i);
    console.log("Contributions match:", match ? match[0] : "not found");
    
  } catch (err) {
    console.error(err);
  }
}

run();
