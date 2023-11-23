// routes/retailerRoutes.js
const express = require('express');
const router = express.Router();
const {
    createRetailer,
    loginRetailer,
    getAllRetailers,
    getRetailerById,
    updateRetailerById,
    deleteRetailerById,
} = require('../controllers/retailer.controller');

// Create a new retailer
router.post('/signup', createRetailer);

// Login a retailer
router.post('/login', loginRetailer);

// Get all retailers
router.get('/getall', getAllRetailers);

// Get a specific retailer by ID
router.get('/retailers/:id', getRetailerById);

// Update a retailer by ID
router.put('/update/:id', updateRetailerById);

// Delete a retailer by ID
router.delete('/delete/:id', deleteRetailerById);

module.exports = router;
