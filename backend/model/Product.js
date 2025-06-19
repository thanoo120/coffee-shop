import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  price: Number,
});

export default mongoose.model('Product', productSchema);
