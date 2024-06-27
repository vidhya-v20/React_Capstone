const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {

    const parsedUrl = url.parse(req.url, true);

    if (parsedUrl.pathname === '/') {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Welcome to my Node.js server with Advanced Challenge!\n');
    } else if (parsedUrl.pathname === '/about') {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('About Us\n');
    } else if (parsedUrl.pathname === '/contact') {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Contact Us\n');
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('404 Not Found\n');
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
