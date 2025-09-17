const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cinema-plus';

const connect = async () => {
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
  }
};

connect();

module.exports = mongoose;