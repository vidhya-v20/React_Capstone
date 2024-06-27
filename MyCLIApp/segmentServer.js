const http = require('http')
const url = require('url')

const server = http.createServer((req, res) => {
    // Parse the URL
    const parsedUrl = url.parse(req.url, true)

    // Extract path segments
    const segments = parsedUrl.pathname.split('/').filter(segment => segment)

    // Log the path segments to the console
    console.log('Path Segments:', segments)

    // Send a response to the client
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Check the server console to see the path segments!')
});

const PORT = 3000
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});