require("dotenv").config();
const twilio = require('twilio');

// Replace with your Twilio Account SID and Auth Token from environment variables
const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;

// Create a Twilio client
const client = new twilio(accountSid, authToken);

// Function to generate a random OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

let storedOTP = ""; // Initialize a variable to store the OTP

// Function to send OTP via SMS
const sendOTP = async (phoneNumber) => {
  const otp = generateOTP(); // Generate the OTP
  storedOTP = otp; // Store the generated OTP
  try {
    await client.messages.create({
      body: `Your OTP for Verification is: ${otp}`,
      from: '+19519994404', // Replace with your Twilio phone number
      to: phoneNumber,
    });
  } catch (error) {
    console.log(error);
    throw error; // Rethrow the error to handle it in the calling function
  }
}

const sendOTPHandler = async (req, res) => {
  const recipientPhoneNumber = req.body.phoneNumber; // Get the recipient's phone number from the request body
  try {
    await sendOTP(recipientPhoneNumber);
    res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).json({
      message: error.message, // Display the error message
      success: false
    });
  }
};

const verifyOtpHandler = (req, res) => {
  const userOTP = req.body.otp; 
  // console.log(userOTP, storedOTP);
  try {
    if (userOTP === storedOTP) {
      res.json({ 
        message: 'OTP verified successfully',
        success: true
       });
    } else {
      res.status(400).json({
        message: 'Invalid OTP',
        success: false
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message, // Display the error message
      success: false
    });
  }
}

module.exports = {
  verifyOtpHandler,
  sendOTPHandler,
  sendOTP
};
