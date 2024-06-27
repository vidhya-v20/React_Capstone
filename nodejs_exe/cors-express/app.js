
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());


app.get('/', (req, res) => {
    res.send('Hello, CORS!');
});


app.get('/data', cors(), (req, res) => {
    res.json({ message: 'This route has CORS enabled for all origins!' });
});

// Custom CORS for a specific domain
const corsOptions = {
    origin: 'http://example.com', // Allow requests from this origin
    optionsSuccessStatus: 200 // Some legacy browsers (IE11) choke on 204
};
app.post('/update', cors(corsOptions), (req, res) => {
    res.json({ message: 'CORS enabled for only example.com' });
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
