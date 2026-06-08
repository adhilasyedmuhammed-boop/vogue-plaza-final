const mongoose = require('mongoose');
const dns = require('dns');

// Use public DNS resolvers when local DNS does not support MongoDB SRV resolution.
// This is a common fix for `querySrv ECONNREFUSED` on Windows or restricted networks.
dns.setServers(['8.8.8.8', '1.1.1.1']);

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/vogue_plaza';
const uriSource = process.env.MONGO_URI
  ? 'MONGO_URI'
  : process.env.MONGODB_URI
  ? 'MONGODB_URI'
  : 'local fallback';

const connectDB = async () => {
    try {
        console.log(`Connecting to MongoDB using ${uriSource}`);
        const conn = await mongoose.connect(MONGO_URI, {
            serverSelectionTimeoutMS: 10000,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Database Connection Error: ${error.message}`);
        console.warn('Continuing without MongoDB connection so static /api endpoints remain available.');
    }
};

module.exports = connectDB;