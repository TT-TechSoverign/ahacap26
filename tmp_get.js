const https = require('https');

const optionsProd = {
  hostname: 'affordablehome-ac.com',
  port: 443,
  path: '/api/v1/content',
  method: 'GET',
  rejectUnauthorized: false
};

const req = https.request(optionsProd, (res) => {
  let data = '';
  res.on('data', (d) => { data += d; });
  res.on('end', () => {
     if (data.includes('mini_split_ac')) {
         console.log("SUCCESS! Found mini_split_ac in the live API!");
     } else {
         console.log("FAILED. Did not find mini_split_ac.");
     }
  });
});

req.on('error', (e) => {
  console.error(e);
});

req.end();
