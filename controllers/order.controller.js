const Order = require('../models/order.model');

const getAllOrders = async (req, res) => {
    try {
        // Assuming you have a way to identify the retailer from the request
        const retailerId = req.user.userId;
        
        // Find orders associated with the specific retailer
        const orders = await Order.find({ retailer: retailerId });
        
        res.status(200).json({
            success: true,
            message: 'Orders retrieved successfully',
            orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving orders',
            error: error.message
        });
    }
};

const createOrder = async (req, res) => {
    try {
        const retailerId = req.user.userId;
        const order = new Order({ ...req.body, retailer: retailerId });
        await order.save();
        res.status(201).json({
            success: true,
            message: 'Order created successfully',
            order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating order',
            error: error.message
        });
    }
};

const getOrderById = async (req, res) => {
    try {
        const retailerId = req.user.userId;
        const order = await Order.findOne({ _id: req.params.id, retailer: retailerId });
        
        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Order retrieved successfully',
            order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving order',
            error: error.message
        });
    }
};

const updateOrder = async (req, res) => {
    try {
        const retailerId = req.user.userId;
        const order = await Order.findOneAndUpdate({ _id: req.params.id, retailer: retailerId }, req.body, {
            new: true,
            runValidators: true,
        });
        
        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found or you do not have permission to update'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Order updated successfully',
            order
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating order', error: error.message });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const retailerId = req.user.userId;
        const order = await Order.findOneAndDelete({ _id: req.params.id, retailer: retailerId });
        
        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found or you do not have permission to delete'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Order deleted successfully',
            data: null
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting order', error: error.message });
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder
};
