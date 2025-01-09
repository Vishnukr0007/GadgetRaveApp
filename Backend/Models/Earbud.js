const mongoose = require("mongoose");

const EarBudschema = new mongoose.Schema({
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

const Earbuds= mongoose.model("earbuds", EarBudschema);
  
module.exports=Earbuds;