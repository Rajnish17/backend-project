const Retailer =require("../models/retailer.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// Create a new retailer
const createRetailer = async (req, res) => {
    try {
      // Validate required fields
      const { firstName, lastName, email, phoneNo, address, state, city, block, pinCode, password, aadharNo, panNo } = req.body;
  
      if (!firstName || !lastName || !email || !phoneNo || !address || !state || !city || !block || !pinCode || !password || !aadharNo || !panNo) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      const newRetailer = await Retailer.create(req.body);
      res.status(201).json(newRetailer);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const loginRetailer = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Validate email and password
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }
  
      // Find the retailer by email
      const retailer = await Retailer.findOne({ email });
  
      // Check if retailer exists and password is correct
      if (!retailer || !bcrypt.compareSync(password, retailer.password)) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Generate and send a token
      const token = jwt.sign(
        {
            userId: retailer._id,
            role:retailer.role
        },
        process.env.JWT_SECRET, // Use a secret key stored in your environment variables
        {
            expiresIn: "1h", // Token expiration time (adjust as needed)
        }
    );
    res.status(200).json({
        success: true,
        message: "Login successful",
        // user,
        token,
    });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };






// Get all retailers
const getAllRetailers = async (req, res) => {
  try {
    const retailers = await Retailer.find();
    res.status(200).json(retailers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific retailer by ID
const getRetailerById = async (req, res) => {
  try {
    const retailer = await Retailer.findById(req.params.id);
    if (!retailer) {
      return res.status(404).json({ message: 'Retailer not found' });
    }
    res.status(200).json(retailer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a retailer by ID
const updateRetailerById = async (req, res) => {
  try {
    const updatedRetailer = await Retailer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedRetailer) {
      return res.status(404).json({ message: 'Retailer not found' });
    }
    res.status(200).json(updatedRetailer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a retailer by ID
const deleteRetailerById = async (req, res) => {
  try {
    const deletedRetailer = await Retailer.findByIdAndDelete(req.params.id);
    if (!deletedRetailer) {
      return res.status(404).json({ message: 'Retailer not found' });
    }
    res.status(200).json({ message: 'Retailer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createRetailer,
  loginRetailer,
  getAllRetailers,
  getRetailerById,
  updateRetailerById,
  deleteRetailerById,
};
