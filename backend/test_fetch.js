const FormData = require('form-data');
const fs = require('fs');
const http = require('http');

const form = new FormData();
form.append('image', fs.createReadStream('../frontend/logo.png'));

const request = http.request({
  method: 'POST',
  host: 'localhost',
  port: 5000,
  path: '/api/ai/detect-disease',
  headers: form.getHeaders(),
});

form.pipe(request);

request.on('response', (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => console.log('STATUS:', res.statusCode, '\nBODY:', body));
});
request.on('error', console.error);
