const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNo: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    block: {
        type: String,
        required: true,
    },
    pinCode: {
        type: String,
        required: true,
    },
    landMark: String,
    password: {
        type: String,
        required: true,
    },
    role: { type: String, enum: ['admin', 'customer', 'retailer'], default: 'customer' },
   
},{timestamps:true});

// Create the User model using the user schema
const User = mongoose.model("User", userSchema);

module.exports = User;
