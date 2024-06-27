const express = require('express');
const app = express();
const productRoutes = require('/Users/vidhya-v/Desktop/Academy/routes/productRoutes.js');

// Middleware to parse JSON bodies
app.use(express.json());

// Mount the productRoutes on the /products endpoint
app.use('/products', productRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});