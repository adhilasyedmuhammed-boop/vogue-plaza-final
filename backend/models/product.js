const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discountPrice: {
        type: Number
    },
    image: {
        type: String,
        required: true
    },
    sizes: [{
        type: String
    }],
    colors: [{
        type: String
    }],
    fabric: {
        type: String
    },
    fit: {
        type: String
    },
    description: {
        type: String
    },
    inStock: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
