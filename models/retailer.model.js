// models/Customer.js
const mongoose = require('mongoose');

const retailerSchema = new mongoose.Schema({

  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique:true
  },
  address: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  block: {
    type: String,
    required: true,
  },
  pinCode: {
    type: String,
    required: true,
  },
 
  aadharNo: {
    type: String,
    required: true,
  },
  panNo: {
    type: String,
    required: true,
  },
  role: { type: String, enum: ['admin','retailer'], default: 'retailer' },

  
}, { timestamps: true })

module.exports = mongoose.model('Retailer', retailerSchema);
