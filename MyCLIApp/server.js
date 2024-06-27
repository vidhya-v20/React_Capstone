const http = require('http')

const server = http.createServer((req, res) => {
    // Handle HTTP GET
    if (req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' })
        res.end('Received a GET request\n')
    }

    // Handle HTTP POST
    else if (req.method === 'POST') {
        res.writeHead(200, { 'Content-Type': 'text/plain' })
        res.end('Received a POST request\n')
    }

    // Handle HTTP PUT
    else if (req.method === 'PUT') {
        res.writeHead(200, { 'Content-Type': 'text/plain' })
        res.end('Received a PUT request\n')
    }

    // Handle HTTP DELETE
    else if (req.method === 'DELETE') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Received a DELETE request\n');
    }

    // Default response for other methods
    else {
        res.writeHead(405)
        res.end(`${req.method} is not allowed on this server`)
    }
})

const PORT = 3000
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});