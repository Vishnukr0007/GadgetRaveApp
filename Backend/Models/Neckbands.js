const mongoose = require("mongoose");

const Neckbandchema = new mongoose.Schema({
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

const Neckband= mongoose.model("Neckbands", Neckbandchema);
  
module.exports=Neckband;