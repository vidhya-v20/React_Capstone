const express = require('express');
const app = express();

// Import the user routes module
const userRoutes = require('/Users/vidhya-v/Desktop/Academy/routes-express/userRoutes.js');

// Use the user routes module for the '/users' path
app.use('/users', userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
