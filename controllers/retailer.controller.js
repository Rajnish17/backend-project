const Retailer =require("../models/retailer.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// Create a new retailer
const createRetailer = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, address, state, city, block, pinCode, aadharNo, panNo,role } = req.body;

  // Check if any of the required parameters are missing
  if (!firstName || !lastName || !email || !phoneNumber || !address || !state || !city || !block || !pinCode || !aadharNo || !panNo) {
      return res.status(400).json({
          success: false,
          message: 'Please provide all required details',
      });
  }

  try {
      // Check if the retailer with the provided email already exists
      const existingRetailer = await Retailer.findOne({
        $or: [
          { email: email },
          { phoneNumber: phoneNumber }
        ]
      });
      
      if (existingRetailer) {
        return res.status(400).json({
          success: false,
          message: 'Retailer with this email or phone number already exists',
        });
      }

      // Hash the retailer's password before saving it to the database
      // const saltRounds = 10; // You can adjust the number of salt rounds
      // const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create a new retailer instance with the hashed password
      const newRetailer = new Retailer({
          firstName,
          lastName,
          email,
          phoneNumber,
          address,
          state,
          city,
          block,
          pinCode,
          aadharNo,
          panNo,
          role
          // password: hashedPassword,
      });

      // Save the new retailer to the database
      await newRetailer.save();

      res.status(201).json({
          success: true,
          message: 'Retailer registered successfully',
          retailer: newRetailer,
      });
  } catch (error) {
      res.status(500).json({
          success: false,
          message: 'Internal server error',
          error: error.message,
      });
  }
};

//login retailer
  // const loginRetailer = async (req, res) => {
  //   try {
  //     const { email, password } = req.body;
  
  //     // Validate email and password
  //     if (!email || !password) {
  //       return res.status(400).json({ message: 'Email and password are required' });
  //     }
  
  //     // Find the retailer by email
  //     const retailer = await Retailer.findOne({ email });
  
  //     // Check if retailer exists and password is correct
  //     if (!retailer || !bcrypt.compareSync(password, retailer.password)) {
  //       return res.status(401).json({ message: 'Invalid email or password' });
  //     }
  
  //     // Generate and send a token
  //     const token = jwt.sign(
  //       {
  //           userId: retailer._id,
  //           role:retailer.role
  //       },
  //       process.env.JWT_SECRET, // Use a secret key stored in your environment variables
  //       {
  //           expiresIn: "7d", // Token expiration time (adjust as needed)
  //       }
  //   );
  //   const role= retailer.role;
  //   res.status(200).json({
  //       success: true,
  //       message: "Login successful",
  //       data:{ token,role}
  //   });
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  // };


  //login with mobile and email
  /*
  const loginRetailer = async (req, res) => {
    try {
      const { email, mobile, password, otp } = req.body;
  
      // Validate email/mobile and password/otp
      if ((email && !password) || (mobile && !otp)) {
        return res.status(400).json({ message: 'Invalid request parameters' });
      }
  
      if (email) {
        // Login with email and password
        const retailer = await Retailer.findOne({ email });
  
        if (!retailer || !bcrypt.compareSync(password, retailer.password)) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }
  
        const token = generateAndSendToken(retailer);
        res.status(200).json({
          success: true,
          message: "Login successful",
          token,
        });
      } else if (mobile) {
        // Login with mobile and OTP
        const storedOTP = otpStore[mobile];
  
        if (!storedOTP || otp !== storedOTP) {
          return res.status(401).json({ message: 'Invalid mobile or OTP' });
        }
  
        delete otpStore[mobile]; // Remove the OTP after successful verification
  
        const retailer = await Retailer.findOne({ phoneNo: mobile });
  
        if (!retailer) {
          return res.status(401).json({ message: 'Retailer not found for the provided mobile number' });
        }
  
        const token = generateAndSendToken(retailer);
        res.status(200).json({
          success: true,
          message: "Login successful",
          token,
        });
      } else {
        return res.status(400).json({ message: 'Invalid request parameters' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const generateAndSendToken = (retailer) => {
    return jwt.sign(
      {
        userId: retailer._id,
        role: retailer.role,
      },
      process.env.JWT_SECRET, // Use a secret key stored in your environment variables
      {
        expiresIn: "1h", // Token expiration time (adjust as needed)
      }
    );
  };
*/

  //end here




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
  // loginRetailer,
  getAllRetailers,
  getRetailerById,
  updateRetailerById,
  deleteRetailerById,
};
