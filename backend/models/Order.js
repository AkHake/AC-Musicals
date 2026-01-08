const mongoose = require('mongoose');


const OrderSchema = new mongoose.Schema({
  email: { 
    type: String,
    required: true,
  },
  pid: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  }],
  date: {
    type: Date,
    default: Date.now,
  },
  apartment: {
    type: String,
  },
  street: {
    type: String,
  },
  city: {
    type: String,
  },
  pincode: {
    type: Number,
  },
  payment: {
    type: String,
  },
  totalamount: {
    type: Number,
  }
});

const Order = mongoose.model("order", OrderSchema);
module.exports = Order;
