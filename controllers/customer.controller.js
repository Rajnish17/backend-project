// controllers/customerController.js
const Customer = require('../models/customer.model');

// Create a new customer
const createCustomer = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      mobileNo,
      email,
      address,
      state,
      city,
      pincode,
      landmark,
      aadharNo,
      panNo,
      totalAmount,
      totalEmiDuration,
      paidEmis,
      lastPaidAmount,
    } = req.body;

    // Check if all required fields are present
    if (!firstName || !lastName || !mobileNo || !email || !address || !state || !city || !pincode || !aadharNo || !panNo || !totalAmount || !totalEmiDuration || !paidEmis || !lastPaidAmount) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required details",
    });
    }

    const customer = new Customer({
      firstName,
      lastName,
      mobileNo,
      email,
      address,
      state,
      city,
      pincode,
      landmark,
      aadharNo,
      panNo,
      totalAmount,
      totalEmiDuration,
      paidEmis,
      lastPaidAmount,
    });

    const savedCustomer = await customer.save();
    res.status(200).json({
      success:true,
      message:"customer registered success"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
  });
  }
};

// Retrieve a list of all customers
const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json({
      success: true,
      data:customers
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
  });
  }
};

module.exports = {
  createCustomer,
  getAllCustomers,
};
