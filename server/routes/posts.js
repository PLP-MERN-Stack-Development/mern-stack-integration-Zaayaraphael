// posts.js - Post routes

const express = require('express');
const router = express.Router();
const {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  searchPosts,
  addComment,
} = require('../controllers/postController');
const { protect } = require('../middleware/auth');
const { authorizePostOwner } = require('../middleware/authorize');
const {
  validatePost,
  validatePostUpdate,
  validateComment,
} = require('../middleware/validate');
const { upload, handleMulterError } = require('../middleware/upload');

// Public routes
router.get('/', getAllPosts);
router.get('/search', searchPosts);
router.get('/:id', getPost);

// Protected routes
router.post('/', protect, validatePost, createPost);
router.put('/:id', protect, authorizePostOwner, validatePostUpdate, updatePost);
router.delete('/:id', protect, authorizePostOwner, deletePost);
router.post('/:id/comments', protect, validateComment, addComment);

// Image upload route
router.post('/upload', protect, upload.single('image'), handleMulterError, (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      error: 'Please upload an image file',
    });
  }

  res.status(200).json({
    success: true,
    filePath: `/uploads/${req.file.filename}`,
    fileName: req.file.filename,
  });
});

module.exports = router;
