const http = require('http');

const server = http.createServer((req, res) => {
   
    res.writeHead(200, {'Content-Type': 'text/plain'});
    
  
    res.end('Welcome to my Node.js server!\n');
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
