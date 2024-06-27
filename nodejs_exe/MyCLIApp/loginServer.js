const http = require('http');
const { parse } = require('querystring');

const users = {
    'john': { username: 'john', password: 'password' }
};

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/login') {
        handleLogin(req, res);
    } else if (req.method === 'PUT' && req.url === '/update') {
        handleUpdate(req, res);
    } else if (req.method === 'DELETE' && req.url === '/delete') {
        handleDelete(req, res);
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('404 Not Found\n');
    }
});

function handleLogin(req, res) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        let data;
        try {
            data = JSON.parse(body);
        } catch (error) {
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.end('Invalid JSON\n');
            return;
        }

        if (data.username && data.password) {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Login Successful!\n');
        } else {
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.end('Login Failed: Username and password are required.\n');
        }
    });
}

function handleUpdate(req, res) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        const data = parse(body);
        const { username, attribute } = data;

        if (username && users[username]) {
            // Update user attribute
            users[username] = { ...users[username], ...JSON.parse(attribute) };
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Update Successful!\n');
        } else {
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.end('Operation Failed: User not found.\n');
        }
    });
}


function handleDelete(req, res) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        const data = parse(body);
        const { username } = data;

        if (username && users[username]) {
            // Delete user
            delete users[username];
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Deletion Successful!\n');
        } else {
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.end('Operation Failed: User not found.\n');
        }
    });
}

const port = 3000;
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
