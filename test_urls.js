const https = require('https');

function checkHost(hostname, path) {
  const options = {
    hostname,
    port: 443,
    path,
    method: 'GET',
    rejectUnauthorized: false
  };

  const req = https.request(options, (res) => {
    console.log(`[${hostname}${path}] HTTP ${res.statusCode}`);
  });

  req.on('error', (e) => {
    console.error(`Error on ${hostname}:`, e.message);
  });

  req.end();
}

checkHost('staging.affordablehome-ac.com', '/mini_split_ac');
checkHost('affordablehome-ac.com', '/mini_split_ac');
