const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: String
    },
    stars: {
        type: Number,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    isApproved: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
