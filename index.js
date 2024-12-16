const express = require('express');
const path = require('path');
const fs = require('fs');
const https = require('https');
const app = express();
const port = 3000;

// Load SSL certificate and key
const options = {
  key: fs.readFileSync('/home/ubuntu/ssl-certificates/privkey.pem'),
  cert: fs.readFileSync('/home/ubuntu/ssl-certificates/fullchain.pem'),
};

app.get('/', (req, res) => {
  const file = path.join(__dirname, 'pages', 'index.html');
  res.sendFile(file);
})

app.get('/about', (req, res) => {
  const file = path.join(__dirname, 'pages', 'about.html');
  res.sendFile(file);
})

app.get('/contact', (req, res) => {
  const file = path.join(__dirname, 'pages', 'contact.html');
  res.sendFile(file);
})

https.createServer(options, app).listen(port, () => {
  console.log(`Server running on https://gustydev.duckdns.org`);
});

app.get('*', (req,res) => {
  res.status(404).sendFile(path.join(__dirname, 'pages', '404.html'))
})
