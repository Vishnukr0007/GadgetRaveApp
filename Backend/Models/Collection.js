const mongoose = require('mongoose');

// Define the product schema
const CollectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the product model
const Collection = mongoose.model('Collection', CollectionSchema);

module.exports = Collection;
