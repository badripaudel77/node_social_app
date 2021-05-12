const express = require('express')

const router = express.Router()

const authenticateUser = require('../middleware/auth');

const { getAllPosts, createPost, updatePost, deletePost } = require('../controllers/postController')


//apply middleware for protected paths / urls
router.use(authenticateUser)

//routes
router.get('/:userId', getAllPosts)
router.post('/new', createPost)
router.put('/update/:postId', updatePost)
router.delete('/delete/:postId', deletePost)

module.exports = router