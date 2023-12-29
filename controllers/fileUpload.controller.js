// controllers/uploadController.js
const mongoose = require('mongoose');
const Upload = require('../models/fileUpload.model');

const uploadFile = async (req, res) => {
  try {
    // Save file URL to MongoDB
    const newUpload = new Upload({ url: req.file.path });
    await newUpload.save();

    res.status(201).json({ message: 'File uploaded successfully', url: req.file.path });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports ={
    uploadFile
}
