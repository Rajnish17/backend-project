// order.controller.js
const Order = require('../models/order.model');

const createOrder = async (req, res) => {
    try {
        const { customerName, user, products } = req.body;

        // Assuming you have a function to calculate the total amount based on product prices
        const totalAmount = calculateTotalAmount(products);

        const order = new Order({
            customerName,
            user,
            products,
            totalAmount,
        });

        await order.save();

        res.status(201).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


 const getAllOrders = async(req, res)=> {
    try {
      const orders = await Order.find().populate('user').populate('products');
      if(!orders){
        return res.status(400).json({
          success:false,
          message:"No order Item"
        })
      }
      res.status(200).json({
        success:true,
        message:"all order items",
        orders:orders
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

// Helper function to calculate total amount based on product prices
function calculateTotalAmount(products) {
    // You need to implement this function based on your logic
    // For example, fetching product prices from the database and calculating the total
    // For simplicity, this example assumes products have a "price" field
    const totalAmount = products.reduce((acc, product) => acc + product.price, 0);
    return totalAmount;
}

module.exports = {
    createOrder,
    getAllOrders
};
