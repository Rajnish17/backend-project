// routes/uploadRoutes.js
const express = require('express');
const router = express.Router();
const multerUpload = require('../utils/fileUpload.utils');
const {uploadFile} = require('../controllers/fileUpload.controller');
const{isRetailer} =require("../middleware/usertype")

// Handle file upload
router.post('/upload',isRetailer, multerUpload.single('file'), uploadFile);

module.exports = router;
