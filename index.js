const express = require('express');
const path = require('path');
const fs = require('fs');
const https = require('https');
const app = express();
const port = 3000;

// Load SSL certificate and key
const privateKey = fs.readFileSync('/etc/letsencrypt/live/gustydev.duckdns.org/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/gustydev.duckdns.org/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/gustydev.duckdns.org/chain.pem', 'utf8');

const credentials = { key: privateKey, cert: certificate, ca: ca };

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

https.createServer(credentials, app).listen(port, () => {
  console.log(`Server running on https://gustydev.duckdns.org`);
});

app.get('*', (req,res) => {
  res.status(404).sendFile(path.join(__dirname, 'pages', '404.html'))
})
