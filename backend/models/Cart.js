const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');


const cartSchema = new mongoose.Schema({
    cartid: {
    type: String,
    default: uuidv4,  // Automatically assign a unique value
    unique: true,
  },
  email: { type: String, required: true, ref: 'user' }, // Use email instead of ObjectId for user
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
  quantity: { type: Number, default: 1, min: 1 },
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
