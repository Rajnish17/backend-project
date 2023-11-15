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
router.post('/retailers', createRetailer);

// Login a retailer
router.post('/retailers/login', loginRetailer);

// Get all retailers
router.get('/retailers', getAllRetailers);

// Get a specific retailer by ID
router.get('/retailers/:id', getRetailerById);

// Update a retailer by ID
router.put('/retailers/:id', updateRetailerById);

// Delete a retailer by ID
router.delete('/retailers/:id', deleteRetailerById);

module.exports = router;
