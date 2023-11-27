const express = require("express");
const router = express.Router();
const {
    addProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById,
} = require("../controllers/product.controller");
const { isRetailer } = require("../middleware/usertype");

// CRUD operations for products
router.post('/add', isRetailer, addProduct);
router.get('/getall', getAllProducts); // Allow customers to view products
router.get('/getone/:id', getProductById); // Allow customers to view products
router.put('/update/:id', isRetailer, updateProductById);
router.delete('/delete/:id', isRetailer, deleteProductById);

module.exports = router;
