const mongoose = require('mongoose');

const connectDB = () => {
  try {
    mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // Geef in de terminal aan dat koppelen gelukt is
    console.log('DB - connected');
  } catch (error) {
    // Geef in de terminal aan dat koppelen niet gelukt is
    console.log('error occured while trying', error);
    throw error;
  }
};

module.exports = connectDB;