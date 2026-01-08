const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
  productid: {
    type: Number,
    required: true,
    unique:true
  },
  pname: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  img1: {
    type: String, // Assuming it's a URL or file path
    required: true,
  },
  img2: {
    type: String, // Optional image field
  },
  img3: {
    type: String, // Optional image field
  },
});

const Product = mongoose.model('product', ProductSchema);
module.exports = Product;
