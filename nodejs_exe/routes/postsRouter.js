const express = require('express')
const router = express.Router({ mergeParams: true })
const commentsRouter = require('./commentsRouter')

// Route to get all posts for a user
router.get('/', (req, res) => {
    res.send(`List of posts for User ${req.params.userId}`)
})

// Route to get a specific post
router.get('/:postId', (req, res) => {
    res.send(`Details of Post ${req.params.postId} for User ${req.params.userId}`)
})

// Nested comments router
router.use('/:postId/comments', commentsRouter)

module.exports = router