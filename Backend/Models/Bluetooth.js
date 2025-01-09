const mongoose = require("mongoose");

const Bluetoothchema = new mongoose.Schema({
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

const BluetoothSpeakers= mongoose.model("BluetoothSpeakers", Bluetoothchema);
  
module.exports=BluetoothSpeakers;