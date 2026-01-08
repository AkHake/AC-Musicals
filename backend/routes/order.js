const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const User = require('../models/User');

// Place an order
router.post('/order', async (req, res) => {
  const { email, pid, apartment, street, city, pincode, payment, totalamount } = req.body;

  try {
    const user = await User.findOne({ email: email }); // Find user by email
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const order = new Order({
      email: user.email,
      pid: pid,
      apartment: apartment,
      street: street,
      city: city,
      pincode: pincode,
      payment: payment,
      totalamount: totalamount,
    });

    await order.save();
    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ error: 'Failed to place order. Please try again later.' });
  }
});

module.exports = router;
