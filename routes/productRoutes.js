const express = require('express');
const router = express.Router();

// Example dummy data for products
let products = [
    { id: 1, name: 'Product 1', price: 29.99 },
    { id: 2, name: 'Product 2', price: 39.99 },
    { id: 3, name: 'Product 3', price: 49.99 },
];
router.use('/:productId/reviews', require('./reviewsRouter'));

// GET all products
router.get('/', (req, res) => {
    res.json(products);
});

// GET a single product by id
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    if (!product) {
        return res.status(404).send('Product not found');
    }
    res.json(product);
});

// POST a new product
router.post('/', (req, res) => {
    const { name, price } = req.body;
    if (!name || !price) {
        return res.status(400).send('Name and price are required');
    }
    const id = products.length + 1;
    const newProduct = {
        id,
        name,
        price: parseFloat(price)  // assuming price is a string, convert to float
    };
    products.push(newProduct);
    res.send(`Product '${name}' added with ID ${id}`);
});

// PUT update an existing product
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, price } = req.body;
    const product = products.find(p => p.id === id);
    if (!product) {
        return res.status(404).send('Product not found');
    }
    product.name = name || product.name;
    product.price = price ? parseFloat(price) : product.price;  // update price if provided
    res.send(`Product '${product.name}' updated`);
});

// DELETE a product
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);
    if (index === -1) {
        return res.status(404).send('Product not found');
    }
    const deletedProduct = products.splice(index, 1);
    res.send(`Product '${deletedProduct[0].name}' deleted`);
});



// GET all products with optional query parameters for filtering and sorting
router.get('/', (req, res) => {
    let filteredProducts = [...products];

    // Filter by price range
    const { minPrice, maxPrice } = req.query;
    if (minPrice && !isNaN(minPrice)) {
        filteredProducts = filteredProducts.filter(p => p.price >= parseFloat(minPrice));
    }
    if (maxPrice && !isNaN(maxPrice)) {
        filteredProducts = filteredProducts.filter(p => p.price <= parseFloat(maxPrice));
    }

    // Sorting
    const { sortBy } = req.query;
    if (sortBy === 'name') {
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'price') {
        filteredProducts.sort((a, b) => a.price - b.price);
    }

    res.json(filteredProducts);
});


module.exports = router;
