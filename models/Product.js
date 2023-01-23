const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    max: 200,
    default: '',
  },
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
