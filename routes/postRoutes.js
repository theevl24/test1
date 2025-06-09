const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/posts', postController.getAllPosts);
router.post('/posts', authMiddleware, postController.addPost);
router.delete('/posts/:id', authMiddleware, postController.deletePost);
router.put('/posts/:id', authMiddleware, postController.changePost);

module.exports = router;