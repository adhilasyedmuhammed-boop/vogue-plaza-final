const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const mongoose = require('mongoose');
const fs = require('fs');
const Product = require('./models/product');
const Category = require('./models/category');
const Review = require('./models/review');
const connectDB = require('./config/db');

// Connect to MongoDB Atlas
connectDB();

// Read your JSON files
const products = JSON.parse(fs.readFileSync(`${__dirname}/products.json`, 'utf-8'));
const categories = JSON.parse(fs.readFileSync(`${__dirname}/categories.json`, 'utf-8'));
const reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'));

// Function to upload data
const importData = async () => {
    try {
        // Clears out any old test data first so you don't get duplicates
        await Product.deleteMany();
        await Category.deleteMany();
        await Review.deleteMany();
        
        // Inserts your JSON arrays into the cloud
        await Product.insertMany(products);
        await Category.insertMany(categories);
        await Review.insertMany(reviews);
        
        console.log('Data successfully imported to MongoDB Atlas! 🎉');
        process.exit();
    } catch (error) {
        console.error(`Error importing data: ${error.message}`);
        process.exit(1);
    }
};

// Execute the function
importData();