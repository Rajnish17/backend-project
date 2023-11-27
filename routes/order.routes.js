const express = require('express');
const router = express.Router();
const {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder
} = require("../controllers/order.controller")





router.post("/create", createOrder);
router.get("/getall", getAllOrders);
router.get("/getone", getOrderById);
router.put("/update", updateOrder);
router.delete("/delete", deleteOrder);


module.exports = router;
