require("dotenv").config();
const twilio = require('twilio');

// Replace with your Twilio Account SID and Auth Token from environment variables
const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;

// Create a Twilio client
const client = new twilio(accountSid, authToken);

// Function to generate a random OTP
const generateOTP = () => {
    return otp = "123456";
    // return Math.floor(100000 + Math.random() * 900000).toString();
     
}

// Function to send OTP via SMS
const sendOTP = async (phoneNo, otp) => {
    try {
        await client.messages.create({
            body: `Your OTP for Verification is: ${otp}`,
            from: '+19519994404', // Replace with your Twilio phone number
            to: phoneNo,
        });
    } catch (error) {
        // console.error(error);

        throw new Error("Error sending OTP ");
    }
}

module.exports = {
    generateOTP,
    sendOTP
};
