const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneno: {
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
    pincode: {
        type: String,
        required: true,
    },
    landmark: String,
    password: {
        type: String,
        required: true,
    }
   
},{timestamps:true});

// Create the User model using the user schema
const User = mongoose.model("User", userSchema);

module.exports = User;
