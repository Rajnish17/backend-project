// models/Customer.js
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  mobileNo: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: String, required: true },
  landmark: { type: String, required: true },
  aadharNo: { type: String, required: true },
  panNo: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  totalEmiDuration: { type: Number, required: true },
  paidEmis: { type: Number, required: true },
  lastPaidAmount: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Customer', customerSchema);
