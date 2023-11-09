// routes/customerRoutes.js
const express = require('express');
const router = express.Router();
const {getAllCustomers,createCustomer} = require('../controllers/customer.controller');

// Create a new customer
router.post('/customers',createCustomer);

// Retrieve a list of all customers
router.get('/customers',getAllCustomers);

module.exports = router;
