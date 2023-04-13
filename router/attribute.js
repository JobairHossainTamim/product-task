const express = require('express');
const router = express.Router();
const knex = require('../config/DbConfig');

// Create a new attribute
router.post('/', async (req, res) => {
    try {
        const { name, values } = req.body;

        const attribute = await knex('attributes').insert({ name });

        const attributeId = attribute[0];

        const attributeValues = values.map(value => ({ attribute_id: attributeId, value }));

        await knex('attribute_values').insert(attributeValues);

        res.status(201).json({ message: 'Attribute created successfully', attribute });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create attribute', error });
    }
});

// Get all attributes
router.get('/', async (req, res) => {
    try {
        const attributes = await knex('attributes').select('*');
        res.status(200).json({ attributes });
    } catch (error) {
        res.status(500).json({ message: 'Failed to get attributes', error });
    }
});

// Get attribute by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params; const attribute = await knex('attributes').select('*').where({ id }).first();

        if (!attribute) {
            return res.status(404).json({ message: 'Attribute not found' });
        }

        const attributeValues = await knex('attribute_values').select('value').where({ attribute_id: id });

        attribute.values = attributeValues.map(value => value.value);

        res.status(200).json({ attribute });
    } catch (error) {
        res.status(500).json({ message: 'Failed to get attribute', error });
    }
});

// Update attribute
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, values } = req.body;
        await knex('attributes').where({ id }).update({ name });

        await knex('attribute_values').where({ attribute_id: id }).del();

        const attributeValues = values.map(value => ({ attribute_id: id, value }));

        await knex('attribute_values').insert(attributeValues);

        res.status(200).json({ message: 'Attribute updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update attribute', error });
    }
});

// Delete attribute
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await knex('attributes').where({ id }).del();

        await knex('attribute_values').where({ attribute_id: id }).del();

        res.status(200).json({ message: 'Attribute deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete attribute', error });
    }
});

module.exports = router;