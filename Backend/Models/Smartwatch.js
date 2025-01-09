const mongoose = require("mongoose");

const Smartwatchschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

const Smartwatch= mongoose.model("Smartwatches", Smartwatchschema);
  
module.exports=Smartwatch;