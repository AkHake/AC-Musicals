const express = require("express");
const router = express.Router();
const Product = require("../models/Products");
const { body, validationResult } = require("express-validator");

// Add a new product
router.post(
  "/add",
  [
    body("productid").isNumeric().withMessage("Product ID must be a number."),
    body("pname").notEmpty().withMessage("Product name is required."),
    body("desc").notEmpty().withMessage("Description is required."),
    body("price").isFloat({ gt: 0 }).withMessage("Price must be greater than 0."),
    body("quantity").isInt({ min: 0 }).withMessage("Quantity must be a non-negative integer."),
    // body("img1").isURL().withMessage("Image 1 must be a valid URL."),
    body("img1")
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { productid, pname, desc, price, quantity, img1, img2, img3 } = req.body;

      const existingProduct = await Product.findOne({ productid });
      if (existingProduct) {
        return res.status(400).json({ message: "Product ID already exists." });
      }

      const product = new Product({ productid, pname, desc, price, quantity, img1, img2, img3 });
      await product.save();

      res.status(201).json({ message: "Product added successfully.", product });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error." });
    }
  }
);

// Update an existing product
router.put(
  "/update/:id",
  [
    body("pname").optional().notEmpty().withMessage("Product name cannot be empty."),
    body("desc").optional().notEmpty().withMessage("Description cannot be empty."),
    body("price").optional().isFloat({ gt: 0 }).withMessage("Price must be greater than 0."),
    body("quantity").optional().isInt({ min: 0 }).withMessage("Quantity must be a non-negative integer."),
    // body("img1").optional().isURL().withMessage("Image 1 must be a valid URL."),
    body("img1")
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const productId = req.params.id;
      const updateData = req.body;

      const updatedProduct = await Product.findOneAndUpdate(
        { productid: productId },
        updateData,
        { new: true }
      );

      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found." });
      }

      res.status(200).json({ message: "Product updated successfully.", updatedProduct });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error." });
    }
  }
);

// Delete a product
router.delete("/delete/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findOneAndDelete({ productid: productId });

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json({ message: "Product deleted successfully.", deletedProduct });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
});

// Get all products
router.get("/all", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
});

// Get a single product by ID
router.get("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findOne({ productid: productId });

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
});

module.exports = router;
