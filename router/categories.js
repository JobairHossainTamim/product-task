
const express = require('express');
const categoriesController = require('../controllers/categories');

const router = express.Router();

// Create Category
router.post('/', categoriesController.createCategory);

// Get All Categories
router.get('/', categoriesController.getAllCategories);

// Get Category by ID
router.get('/:id', categoriesController.getCategoryById);

// Update Category
router.put('/:id', categoriesController.updateCategory);

// Delete Category
router.delete('/:id', categoriesController.deleteCategory);

module.exports = router;