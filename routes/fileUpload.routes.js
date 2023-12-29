// routes/uploadRoutes.js
const express = require('express');
const router = express.Router();
const multerUpload = require('../utils/fileUpload.utils');
const {uploadFile} = require('../controllers/fileUpload.controller');

// Handle file upload
router.post('/upload', multerUpload.single('file'), uploadFile);

module.exports = router;
