const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/vogue_plaza';
const uriSource = process.env.MONGO_URI
  ? 'MONGO_URI'
  : process.env.MONGODB_URI
  ? 'MONGODB_URI'
  : 'local fallback';

console.log('injected env from', path.resolve(__dirname, '.env'));
console.log('Using MongoDB URI source:', uriSource);

(async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB successfully.');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Full connection error:');
    console.error(err);
    if (err.stack) console.error(err.stack);
    process.exit(1);
  }
})();
