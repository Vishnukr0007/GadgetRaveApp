const mongoose = require('mongoose');

// Define the schema for an Order
const orderSchema = new mongoose.Schema({
  address: {
    firstName: String,
    lastName: String,
    streetAddress: String,
    email: String,
    phone: String,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  cartItems: [
    {
      "id": "string",
      "name": "string",
      "price": "number",
      "quantity": "number",
      "imageUrl": "string"
    }
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  orderStatus: {
    type: String,
    enum: ['OrderPlaced', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'OrderPlaced', 
  },
  orderDate: {
    type: Date,
    default: Date.now,
    
  },
  userId: { // This will store the user who placed the order
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
