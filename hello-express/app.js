const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello Express');
});

app.get('/', (req, res) => {
    res.send('Welcome to the Express Error Handling Demo!') 
});

app.get('/hello/:name', (req, res) => {
    const name = req.params.name;
    res.send(`Hello, ${name}!`);
});

// Serve static files from the 'public' directory
app.use(express.static('public'))
// Deliberately cause an error for demonstration
app.get('/error', (req, res) => {
    throw new Error('Something went wrong!')
});

// This route simulates a database operation that could fail
app.get('/data', (req, res, next) => {
    const data = fetchData()
    if (!data) {
        const err = new Error('No data found!')
        err.status = 404  // Custom error status for 404
        next(err);
    } else {
        res.send(data)
    }
})

// Catch 404 errors that were not handled by any routes
app.use((req, res, next) => {
    res.status(404).send('Sorry, that route does not exist.')
});

// General error handling middleware for catching all other errors
app.use((err, req, res, next) => {
    console.error(err.stack)  // Log error for debugging
    res.status(err.status || 500).send(err.message || 'Something broke!')
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});



