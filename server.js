const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;
const ROOT = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  let reqUrl = decodeURI(req.url.split('?')[0]);
  let filePath = path.join(ROOT, reqUrl);

  // If path is a directory or root, check for index.html
  if (reqUrl.endsWith('/')) {
    filePath = path.join(filePath, 'index.html');
  }

  // Check if file exists as-is
  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isFile()) {
      return serveFile(filePath, res);
    }

    // Try appending .html for clean URLs (e.g. /about-us -> /about-us.html)
    const htmlPath = filePath + '.html';
    fs.stat(htmlPath, (err2, stats2) => {
      if (!err2 && stats2.isFile()) {
        return serveFile(htmlPath, res);
      }

      // Check if it's a directory containing index.html
      const dirIndexPath = path.join(filePath, 'index.html');
      fs.stat(dirIndexPath, (err3, stats3) => {
        if (!err3 && stats3.isFile()) {
          return serveFile(dirIndexPath, res);
        }

        // 404 fallback
        const notFoundPath = path.join(ROOT, '404.html');
        fs.readFile(notFoundPath, (err4, content) => {
          res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
          res.end(content || '404 Not Found');
        });
      });
    });
  });
});

function serveFile(file, res) {
  const ext = path.extname(file).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 Internal Server Error');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}

server.listen(PORT, '0.0.0.0', () => {
  console.log(`OneReachAll server live at http://localhost:${PORT}/`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    const nextPort = PORT + 1;
    console.log(`Port ${PORT} in use, trying ${nextPort}...`);
    server.listen(nextPort, '0.0.0.0');
  } else {
    console.error('Server error:', err);
  }
});
