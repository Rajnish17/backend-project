// product.js
const mongoose = require('mongoose');
const Retailer  =require("./retailer.model");

const productSchema = new mongoose.Schema({
    brandName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  modelNo: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Retailer',
    required: true,
},
},{timestamps:true});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
