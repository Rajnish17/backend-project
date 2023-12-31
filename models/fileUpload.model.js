// models/Upload.js
const mongoose = require('mongoose');
const Retailer = require("../models/retailer.model")

const uploadSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  retailerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Retailer',
    required: true,
   
  },
},
  { timestamps: true }
);

const Upload = mongoose.model('Upload', uploadSchema);

module.exports = Upload;
