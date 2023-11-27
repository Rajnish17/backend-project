const Order = require('../models/orderModel');

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createOrder = async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getOrderById = async (req, res) => {
  try {
      const order = await Order.findById(req.params.id);
      if (!order) {
          return res.status(404).json({ error: 'Order not found' });
      }
      res.json(order);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

const updateOrder = async (req, res) => {
  try {
      const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true,
      });
      if (!order) {
          return res.status(404).json({ error: 'Order not found' });
      }
      res.json(order);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
      const order = await Order.findByIdAndDelete(req.params.id);
      if (!order) {
          return res.status(404).json({ error: 'Order not found' });
      }
      res.json({ message: 'Order deleted successfully' });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};


module.exports ={
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder
}
