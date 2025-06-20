const express= require('express');
const Product=require('../model/Product.js');

const router = express.Router();

router.get('/all', async (req, res) => {
  try{
  const products = await Product.find();
  res.json(products);}
  catch(error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports=router;
