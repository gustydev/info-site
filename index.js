const fs = require('fs');
const http = require('http');

http.createServer(function (req, res) {
  let filename;
  if (req.url === '/' || req.url === '/favicon.ico') {
    filename = './pages/index.html';
  } else {
    filename = './pages' + req.url + '.html';
  }

  fs.readFile(filename, (err, data) => {
    if (err) {
      fs.readFile('./pages/404.html', (error, data) => {
        if (error) {
          res.write('Error reading 404 page:', error)
          return res.end();
        }
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
      })
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
    }
  })
}).listen(8080);