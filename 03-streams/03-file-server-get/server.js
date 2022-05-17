const http = require('http');
const path = require('path');
const fs = require('fs');

const server = new http.Server();

server.on('request', (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname.slice(1);
  if (pathname.includes('/')) {
    res.statusCode = 400;
    res.end('Wrong path');
    return;
  }

  const filepath = path.join(__dirname, 'files', pathname);
  console.log(filepath);

  switch (req.method) {
    case 'GET':
      const file = fs.createReadStream(filepath);
      file.pipe(res);
      file.on('error', () => {
        res.statusCode = 404;
        res.end('No file');
      });
      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;
