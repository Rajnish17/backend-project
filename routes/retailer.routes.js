const express = require('express');
const router = express.Router();
const {createRetailer,getAllRetailers,getRetailerById,updateRetailerById,deleteRetailerById} = require('../controllers/retailer.controller');
const{isAdmin} =require("../middleware/usertype")


// Create a new retailer
router.post('/signup', createRetailer);

// Get all retailers
router.get('/getall',isAdmin, getAllRetailers);

// Get a specific retailer by ID
router.get('/getone/:id', getRetailerById);

// Update a retailer by ID
router.put('/update/:id',isAdmin, updateRetailerById);

// Delete a retailer by ID
router.delete('/delete/:id',isAdmin, deleteRetailerById);

module.exports = router;
