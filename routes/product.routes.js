const express = require("express");
const router = express.Router();
const {
    addProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById,
} = require("../controllers/product.controller");
const { isRetailer, isCustomer } = require("../middleware/usertype");

// CRUD operations for products
router.post('/add', isRetailer, addProduct);
router.get('/products', isCustomer, getAllProducts); // Allow customers to view products
router.get('/products/:id', isCustomer, getProductById); // Allow customers to view products
router.put('/products/:id', isRetailer, updateProductById);
router.delete('/products/:id', isRetailer, deleteProductById);

module.exports = router;
