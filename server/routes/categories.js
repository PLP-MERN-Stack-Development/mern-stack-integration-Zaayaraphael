// categories.js - Category routes

const express = require('express');
const router = express.Router();
const {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');
const { protect } = require('../middleware/auth');
const { validateCategory } = require('../middleware/validate');

// Public routes
router.get('/', getAllCategories);
router.get('/:id', getCategory);

// Protected routes
router.post('/', protect, validateCategory, createCategory);
router.put('/:id', protect, validateCategory, updateCategory);
router.delete('/:id', protect, deleteCategory);

module.exports = router;
