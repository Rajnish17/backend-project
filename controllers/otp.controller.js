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

// Function to send OTP via SMS
const sendOTP = async (phoneNumber, otp) => {
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
  const otp = generateOTP();
  try {
    await sendOTP(recipientPhoneNumber, otp);
    res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).json({
      message: error.message, // Display the error message
      success: false
    });
  }
};

const verifyOtpHandler = (req, res) => {
  const userOTP = req.body.otp; // Get the OTP entered by the user from the request body
  // Here, you should compare userOTP with the expected OTP
  // If they match, you can consider the OTP as verified, otherwise, it's invalid.
  const expectedOTP = generateOTP(); // Replace with the actual expected OTP
  if (userOTP === expectedOTP) {
    res.json({ message: 'OTP verified successfully' });
  } else {
    res.status(400).json({
      message: 'Invalid OTP',
      success: false
    });
  }
}

module.exports = {
  verifyOtpHandler,
  sendOTPHandler // Changed the export name to avoid conflicts
};
