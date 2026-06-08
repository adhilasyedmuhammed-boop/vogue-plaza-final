// 1. Load environment variables at the absolute top of the file (explicit backend .env path)
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const Review = require('./models/review');
const Category = require('./models/category');

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Base Route
app.get('/', (req, res) => {
    res.send('Vogue Plaza API is running...');
});

app.get('/api/categories', async (req, res) => {
    try {
        const categories = await Category.find({});
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/reviews', async (req, res) => {
    try {
        const reviews = await Review.find({ isApproved: true });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Product routes
app.use('/api/products', productRoutes);

// Seed route
app.use('/api/seed', require('./routes/seedRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
