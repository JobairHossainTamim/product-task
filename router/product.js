const express = require('express');
const router = express.Router();
const knex = require('../config/DbConfig');

// Create a new product
router.post('/', async (req, res) => {
    try {
        const { name, categories, attributes, status } = req.body;

        const product = await knex('products').insert({ name, status });

        const productId = product[0];

        const productCategories = categories.map(categoryId => ({ product_id: productId, category_id: categoryId }));

        await knex('product_categories').insert(productCategories);

        const productAttributes = attributes.map(attribute => ({ product_id: productId, attribute_id: attribute.id, value: attribute.value }));

        await knex('product_attributes').insert(productAttributes);

        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create product', error });
    }
});

// Get all products
router.get('/', async (req, res) => {
    try {
        const { category, status, search } = req.query;

        let query = knex('products').select('*');

        if (category) {
            query = query.innerJoin('product_categories', 'products.id', 'product_categories.product_id')
                .where({ category_id: category });
        }
        if (status) {
            query = query.where({ status });
        }

        if (search) {
            query = query.where('name', 'like', `%${search}%`);
        }

        const products = await query;

        res.status(200).json({ products });

    } catch (error) {
        res.status(500).json({ message: 'Failed to get products', error });
    }
});

// Get product by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await knex('products').select('*').where({ id }).first();

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const productCategories = await knex('product_categories').select('category_id').where({ product_id: id });

        const categoryIds = productCategories.map(category => category.category_id);

        const categories = await knex('categories').select('*').whereIn('id', categoryIds);

        const productAttributes = await knex('product_attributes').select('*').where({ product_id: id });

        const attributes = await Promise.all(productAttributes.map(async attribute => {
            const { attribute_id, value } = attribute;

            const attributeData = await knex('attributes').select('*').where({ id: attribute_id }).first();

            return { ...attributeData, value };
        }));

        product.categories = categories;
        product.attributes = attributes;

        res.status(200).json({ product });
    } catch (error) {
        res.status(500).json({ message: 'Failed to get product', error });
    }
});

// Update product
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, categories, attributes, status } = req.body;
        await knex('products').where({ id }).update({ name, status });

        await knex('product_categories').where({ product_id: id }).del();

        const productCategories = categories.map(categoryId => ({ product_id: id, category_id: categoryId }));

        await knex('product_categories').insert(productCategories);

        await knex('product_attributes').where({ product_id: id }).del();

        const productAttributes = attributes.map(attribute => ({ product_id: id, attribute_id: attribute.id, value: attribute.value }));

        await knex('product_attributes').insert(productAttributes);

        res.status(200).json({ message: 'Product updated successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Failed to update product', error });
    }
});

// Delete product
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await knex('products').where({ id }).del();

        await knex('product_categories').where({ product_id: id }).del();

        await knex('product_attributes').where({ product_id: id }).del();

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete product', error });
    }
});

module.exports = router;