const https = require('https');

const data = JSON.stringify({
  model: 'gpt-3.5-turbo',
  messages: [{ role: 'user', content: 'Say hello' }],
  max_tokens: 10
});

const options = {
  hostname: 'api.openai.com',
  path: '/v1/chat/completions',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer key_oSIs7VjARsTVtOSO',
    'Content-Length': data.length
  }
};

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`);
  res.on('data', d => {
    process.stdout.write(d);
  });
});

req.on('error', error => {
  console.error(error);
});

req.write(data);
req.end();
