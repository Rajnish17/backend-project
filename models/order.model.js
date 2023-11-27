const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    brandName: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    paidAmount: { type: Number, required: true },
    durationOfEmi: { type: Number, required: true },
    remainingAmount: { type: Number, required: true },
    remainingDuration: { type: Number, required: true },
    emiCompleted: { type: Boolean, default: false },
},{timestamps:true});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
