const express = require('express');
const router = express.Router({ mergeParams: true });

// Example dummy data for reviews
let reviews = [
    { id: 1, productId: 1, text: 'Good product' },
    { id: 2, productId: 1, text: 'Could be better' },
    { id: 3, productId: 2, text: 'Excellent value' },
];

// GET all reviews for a product
router.get('/', (req, res) => {
    const productId = parseInt(req.params.productId);
    const productReviews = reviews.filter(r => r.productId === productId);
    res.json(productReviews);
});

// POST a new review for a product
router.post('/', (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).send('Review text is required');
    }
    const productId = parseInt(req.params.productId);
    const id = reviews.length + 1;
    const newReview = {
        id,
        productId,
        text
    };
    reviews.push(newReview);
    res.send(`Review added for Product ID ${productId}`);
});

// DELETE a review for a product
router.delete('/:reviewId', (req, res) => {
    const productId = parseInt(req.params.productId);
    const reviewId = parseInt(req.params.reviewId);
    const index = reviews.findIndex(r => r.productId === productId && r.id === reviewId);
    if (index === -1) {
        return res.status(404).send('Review not found');
    }
    const deletedReview = reviews.splice(index, 1);
    res.send(`Review deleted for Product ID ${productId}`);
});

module.exports = router;
