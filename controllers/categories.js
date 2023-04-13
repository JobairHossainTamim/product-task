const knex = require('../config/DbConfig'); // Knex instance for MySQL connection

// Create Category
const createCategory = async (req, res) => {
    try {
        const { name, parent_id } = req.body;
        const category = await knex('categories').insert({ name, parent_id });
        res.status(201).json({ message: 'Category created successfully', category });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create category', error });
    }
};

// Get All Categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await knex('categories').select();
        res.status(200).json({ categories });
    } catch (error) {
        res.status(500).json({ message: 'Failed to get categories', error });
    }
};

// Get Category by ID
const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await knex('categories').select().where({ id }).first();
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ category });
    } catch (error) {
        res.status(500).json({ message: 'Failed to get category', error });
    }
};

// Update Category
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, parent_id } = req.body;
        const updatedCategory = await knex('categories')
            .where({ id })
            .update({ name, parent_id });
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update category', error });
    }
};

// Delete Category
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCategory = await knex('categories').where({ id }).del();
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete category', error });
    }
};

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};