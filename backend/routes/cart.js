const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// Add product to cart for a specific user (by email)
router.post('/add/:email', async (req, res) => {
  const { email } = req.params; // Get the email from the route parameter
  const { productId, quantity } = req.body;

  try {
    // Create a new cart entry
    const newCartItem = new Cart({
      email: email, // Use email to associate with the user
      productId: productId,
      quantity: quantity,
    });

    // Save the cart item to the database
    await newCartItem.save();
    res.status(201).json({ message: 'Product added to cart', cartItem: newCartItem });
  } catch (err) {
    console.error('Error adding product to cart:', err);
    res.status(500).json({ error: 'Failed to add product to cart' });
  }
});

// Fetch cart items for a specific user (by email)
router.get('/get/:email', async (req, res) => {
  const email = req.params.email; // Get the email from the route parameter

  try {
    // Fetch cart items for the specific user by email
    const cartItems = await Cart.find({ email: email }).populate('productId');
    res.json(cartItems); // Send cart items as JSON response
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cart items.' });
  }
});

module.exports = router;
