// utils/fileUpload.js
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Configure Multer to use Cloudinary as storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // specify the folder in Cloudinary where the file should be stored
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

const multerUpload = multer({ storage: storage });

module.exports = multerUpload;
