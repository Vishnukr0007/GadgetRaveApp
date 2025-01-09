const mongoose = require("mongoose");

const Keyboardmouseschema = new mongoose.Schema({
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

const Keyboardmouse= mongoose.model("Keyboardmouse", Keyboardmouseschema);
  
module.exports=Keyboardmouse;