const express = require('express');
const router = express.Router();
const {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder
} = require("../controllers/order.controller")

const{isRetailer} =require("../middleware/usertype")



router.post("/create",isRetailer, createOrder);
router.get("/getall",isRetailer, getAllOrders);
router.get("/getone/:id",isRetailer, getOrderById);
router.put("/update/:id",isRetailer, updateOrder);
router.delete("/delete/:id",isRetailer, deleteOrder);//


module.exports = router;

