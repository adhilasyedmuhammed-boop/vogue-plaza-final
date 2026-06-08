const express = require('express');
const router = express.Router();
const Category = require('../models/category');
const Brand = require('../models/brand');
const Review = require('../models/review');
const Post = require('../models/post');
const Product = require('../models/product');

// Seed data
const categories = [
    { slug: "mens-wear", name: "Men's Wear", img: "https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=600", alt: "Elegance Menswear Suits & Apparel" },
    { slug: "ladies-wear", name: "Ladies' Wear", img: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=600", alt: "Premium Womenswear Collection" },
    { slug: "kids", name: "Kids", img: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=600", alt: "Designer Kids Clothing" },
    { slug: "accessories", name: "Accessories", img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600", alt: "Beauty Cosmetics and Designer Accessories" },
    { slug: "shoes", name: "Shoes", img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600", alt: "Luxury Designer Footwear Selection" },
    { slug: "watches", name: "Watches", img: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=600", alt: "Luxury Watches Collection" }
];

const brands = [
    { name: 'Armani', initials: 'AR' },
    { name: 'Gucci', initials: 'GU' },
    { name: 'Versace', initials: 'VE' },
    { name: 'Burberry', initials: 'BU' },
    { name: 'Prada', initials: 'PR' },
    { name: 'Rolex', initials: 'RO' },
    { name: 'Chanel', initials: 'CH' },
    { name: 'Dior', initials: 'DI' }
];

const reviews = [
    { name: "Sophia Henderson", date: "May 15, 2026", text: "The selection here is absolutely unmatched. I found beautiful designer options from Gucci and Burberry that weren't available anywhere else in the city. The personal shopper service made the experience incredibly smooth and completely stress-free. I will definitely be returning for my wardrobe upgrade next season.", stars: 5 },
    { name: "Marcus Vance", date: "April 29, 2026", text: "High-end store with fantastic customer care. I had an issue with a designer jacket I bought, and the manager handled it immediately with no questions asked. Extremely professional. It's rare to see this level of dedication to service these days. Vogue Plaza remains my favorite retail destination.", stars: 5 },
    { name: "Adhila Syedmuhammed", date: "April 12, 2026", text: "Elegant environment, clean store, and highly attentive staff. They helped me pick out a bespoke suit and matching shoes within an hour. The customer satisfaction team is top-notch, checking in post-purchase to ensure absolute comfort. Truly a masterclass in modern retail customer service.", stars: 5 }
];

const posts = [
    {
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=500',
        caption: 'Embracing the minimalist silhouette this season. Find our premium cashmere coat line in store now. #MinimalStyle #WinterWarmth',
        postedDate: 'May 28, 2026'
    },
    {
        image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=500',
        caption: 'Unveiling our summer resort line. Earthy tones paired with lightweight, luxury organic linens. #ResortStyle #LinenLove',
        postedDate: 'May 25, 2026'
    },
    {
        image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=500',
        caption: 'Crafted to perfection. A gentleman\'s footwear collection, custom handcrafted in Italy. #ItalianLeather #DapperStyle',
        postedDate: 'May 20, 2026'
    },
    {
        image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=500',
        caption: 'New arrivals in our Kids Corner. Vibrant, playful, and premium quality. #KidsFashion',
        postedDate: 'May 18, 2026'
    },
    {
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=500',
        caption: 'Transform your living space with our new Home Decor collection. #HomeDecor',
        postedDate: 'May 15, 2026'
    },
    {
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=500',
        caption: 'Step into luxury with our exclusive Footwear collection. Every step, a statement. #LuxuryFootwear',
        postedDate: 'May 12, 2026'
    }
];

const products = [
    // Womenswear
    {
        name: 'Cashmere Wrap Coat',
        brand: 'Burberry',
        category: 'womenswear',
        price: 1290,
        discountPrice: 999,
        image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=500',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        description: 'Premium cashmere wrap coat for elegant winter style'
    },
    {
        name: 'Silk Evening Dress',
        brand: 'Gucci',
        category: 'womenswear',
        price: 2150,
        discountPrice: 1799,
        image: 'https://images.unsplash.com/photo-1566479179817-c0df40be0fc3?q=80&w=500',
        sizes: ['XS', 'S', 'M', 'L'],
        description: 'Luxurious silk evening dress with timeless design'
    },
    // Menswear
    {
        name: 'Italian Wool Suit',
        brand: 'Armani',
        category: 'menswear',
        price: 3200,
        discountPrice: 2599,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500',
        sizes: ['38', '40', '42', '44', '46'],
        description: 'Impeccably tailored Italian wool suit'
    },
    {
        name: 'Oxford Button Shirt',
        brand: 'Versace',
        category: 'menswear',
        price: 450,
        discountPrice: 379,
        image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=500',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        description: 'Classic oxford button-down shirt'
    },
    // Accessories
    {
        name: 'Leather Tote Bag',
        brand: 'Prada',
        category: 'accessories',
        price: 1850,
        discountPrice: 1499,
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=500',
        sizes: ['One Size'],
        description: 'Iconic designer leather tote bag'
    },
    {
        name: 'Pearl Necklace Set',
        brand: 'Chanel',
        category: 'accessories',
        price: 890,
        discountPrice: 749,
        image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=500',
        sizes: ['One Size'],
        description: 'Elegant pearl necklace set'
    },
    // Kids
    {
        name: 'Kids Denim Jacket',
        brand: 'Dior',
        category: 'kids',
        price: 320,
        discountPrice: 259,
        image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?q=80&w=500',
        sizes: ['2Y', '4Y', '6Y', '8Y', '10Y'],
        description: 'Stylish denim jacket for kids'
    },
    {
        name: 'Girls Floral Dress',
        brand: 'Gucci',
        category: 'kids',
        price: 285,
        discountPrice: 229,
        image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=500',
        sizes: ['2Y', '4Y', '6Y', '8Y'],
        description: 'Beautiful floral dress for girls'
    },
    // Home Decor
    {
        name: 'Marble Table Lamp',
        brand: 'Versace',
        category: 'homedecor',
        price: 680,
        discountPrice: 549,
        image: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?q=80&w=500',
        sizes: ['One Size'],
        description: 'Elegant marble table lamp'
    },
    {
        name: 'Velvet Throw Pillow Set',
        brand: 'Armani',
        category: 'homedecor',
        price: 220,
        discountPrice: 179,
        image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=500',
        sizes: ['One Size'],
        description: 'Luxurious velvet throw pillow set'
    },
    // Footwear
    {
        name: 'Oxford Leather Shoes',
        brand: 'Prada',
        category: 'footwear',
        price: 980,
        discountPrice: 799,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=500',
        sizes: ['6', '7', '8', '9', '10', '11'],
        description: 'Classic oxford leather shoes'
    },
    {
        name: 'Stiletto Heels',
        brand: 'Chanel',
        category: 'footwear',
        price: 1100,
        discountPrice: 899,
        image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=500',
        sizes: ['5', '6', '7', '8', '9'],
        description: 'Stunning designer stiletto heels'
    }
];

// Seed route
router.get('/', async (req, res) => {
    try {
        // Delete existing data
        await Category.deleteMany({});
        await Brand.deleteMany({});
        await Review.deleteMany({});
        await Post.deleteMany({});
        await Product.deleteMany({});

        // Insert new data
        await Category.insertMany(categories);
        await Brand.insertMany(brands);
        await Review.insertMany(reviews);
        await Post.insertMany(posts);
        await Product.insertMany(products);

        res.json({
            message: 'Database seeded successfully!',
            data: {
                categories: 6,
                brands: 8,
                posts: 6,
                reviews: 3,
                products: 12
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
