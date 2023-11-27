const mongoose = require('mongoose');
const Retailer =require("./retailer.model")

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
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Retailer',
        required: true,
    }
},{timestamps:true});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
