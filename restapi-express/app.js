const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Sample data - array to simulate a database
let events = [
    { id: 1, title: 'Event 1', date: '2024-06-27' },
    { id: 2, title: 'Event 2', date: '2024-07-05' }
];

// GET all events
app.get('/events', (req, res) => {
    res.json(events);
});

// GET event by ID
app.get('/events/:id', (req, res) => {
    const eventId = parseInt(req.params.id);
    const event = events.find(event => event.id === eventId);

    if (!event) {
        return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
});

// POST new event
app.post('/events', (req, res) => {
    const { title, date } = req.body;

    if (!title || !date) {
        return res.status(400).json({ message: 'Title and date are required' });
    }

    const newEvent = {
        id: events.length + 1,
        title,
        date
    };

    events.push(newEvent);
    res.status(201).json(newEvent);
});

// PUT update event
app.put('/events/:id', (req, res) => {
    const eventId = parseInt(req.params.id);
    const { title, date } = req.body;
    const eventToUpdate = events.find(event => event.id === eventId);

    if (!eventToUpdate) {
        return res.status(404).json({ message: 'Event not found' });
    }

    eventToUpdate.title = title || eventToUpdate.title;
    eventToUpdate.date = date || eventToUpdate.date;

    res.json(eventToUpdate);
});

// DELETE event
app.delete('/events/:id', (req, res) => {
    const eventId = parseInt(req.params.id);
    events = events.filter(event => event.id !== eventId);

    res.status(204).send();
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
