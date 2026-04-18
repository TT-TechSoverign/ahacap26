const fs = require('fs');
const https = require('https');

const data = fs.readFileSync('apps/web/lib/content/content.json', 'utf8');

const options = {
  hostname: 'staging.affordablehome-ac.com',
  port: 443,
  path: '/api/v1/content',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  },
  rejectUnauthorized: false
};

const optionsProd = {
  hostname: 'affordablehome-ac.com',
  port: 443,
  path: '/api/save-content',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  },
  rejectUnauthorized: false
};

const req = https.request(optionsProd, (res) => {
  console.log('Status:', res.statusCode);
  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (e) => {
  console.error(e);
});

req.write(data);
req.end();
