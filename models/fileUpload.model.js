// models/Upload.js
const mongoose = require('mongoose');
const User =require("../models/user.model")

const uploadSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  User:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
},
},
{timestamps:true}
);

const Upload = mongoose.model('Upload', uploadSchema);

module.exports = Upload;
