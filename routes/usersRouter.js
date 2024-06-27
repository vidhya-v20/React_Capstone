const express = require('express')
const router = express.Router()
const postsRouter = require('./postsRouter')

// Route to get all users
router.get('/', (req, res) => {
    res.send('List of Users')
})

// Route to get a specific user
router.get('/:userId', (req, res) => {
    res.send(`Details of User ${req.params.userId}`)
})

// Nested posts router
router.use('/:userId/posts', postsRouter)

module.exports = router