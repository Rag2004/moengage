const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    });
    console.log('MongoDB Atlas connected successfully!');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1); // Force exit if cannot connect
  }
};

module.exports = connectDB;
