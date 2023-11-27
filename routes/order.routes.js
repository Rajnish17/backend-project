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
router.get("/getone",isRetailer, getOrderById);
router.put("/update",isRetailer, updateOrder);
router.delete("/delete",isRetailer, deleteOrder);


module.exports = router;
