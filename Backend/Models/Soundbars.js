const mongoose = require("mongoose");

const Soundbarchema = new mongoose.Schema({
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

const Soundbar= mongoose.model("Soundbars", Soundbarchema);
  
module.exports=Soundbar;