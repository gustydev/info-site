const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

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

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

app.get('*', (req,res) => {
  res.status(404).sendFile(path.join(__dirname, 'pages', '404.html'))
})