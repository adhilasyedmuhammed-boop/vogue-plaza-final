const https = require('https');

function getPublicIP() {
  return new Promise((resolve, reject) => {
    https.get('https://api.ipify.org?format=json', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve(parsed.ip);
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', reject);
  });
}

(async () => {
  try {
    const ip = await getPublicIP();
    console.log('Your public IP is:', ip);
    console.log('Add this IP to your Atlas Project → Security → Network Access → Add IP Address (or use 0.0.0.0/0 for testing).');
    process.exit(0);
  } catch (err) {
    console.error('Failed to determine public IP:', err.message || err);
    process.exit(1);
  }
})();
