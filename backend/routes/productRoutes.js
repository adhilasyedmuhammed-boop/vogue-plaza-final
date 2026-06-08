const express = require('express');
const router = express.Router();
const Product = require('../models/product'); // Import the model we just made

// 1. Get ALL products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 2. Get products by Category
router.get('/category/:categoryName', async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.categoryName });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 3. Get products by Brand
router.get('/brand/:brandName', async (req, res) => {
    try {
        const products = await Product.find({ brand: req.params.brandName });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;