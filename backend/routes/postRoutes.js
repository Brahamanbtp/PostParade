const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authController = require('../controllers/authController');
const upload = require('../middleware/uploadMiddleware');

// Protect all post routes
router.use(authController.protect);

// Create a new post
router.post('/', upload.single('image'), postController.createPost);

// Get all posts
router.get('/', postController.getAllPosts);

// Get a single post by ID
router.get('/:id', postController.getPostById);

// Update a post by ID
router.put('/:id', upload.single('image'), postController.updatePost);

// Delete a post by ID
router.delete('/:id', postController.deletePost);

// Add a reply to a post
router.post('/:id/replies', upload.single('image'), postController.addReply);

module.exports = router;
