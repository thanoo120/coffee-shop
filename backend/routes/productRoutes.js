const express = require('express');
const Product = require('../model/Product.js');
const router = express.Router();
const multer = require('multer');

// Create uploads folder if not exists (optional)
const fs = require('fs');
if (!fs.existsSync('uploads')) fs.mkdirSync('uploads');

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// ✅ Route to Add Product
router.post('/add-product', upload.single('image'), async (req, res) => {
  try {
    const { name, price, description } = req.body;

    // ⛔ check if image is missing
    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required.' });
    }

    const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;

    const product = new Product({
      name,
      price,
      description,
      image: imageUrl,
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// ✅ Route to Get All Products
router.get('/all', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
