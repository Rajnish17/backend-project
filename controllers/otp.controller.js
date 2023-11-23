const { sendOTP, generateOTP } = require("../utils/otp.utils");
const jwt = require("jsonwebtoken");
const Retailer = require("../models/retailer.model");

let otpStore = {}; // Object to store OTPs for each phone number


const sendOTPHandler = async (req, res) => {
    try {
        const { phoneNumber } = req.body;
        if (!phoneNumber) {
            return res.status(400).json({
                message: "Please enter a phone number",
            });
        }

        const otp = generateOTP(); // Generate the OTP
        await sendOTP(phoneNumber, otp); // Send the OTP
        otpStore[phoneNumber] = otp; // Store the OTP in the object
        res.status(200).json({
            success: true,
            message: "OTP sent successfully",
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// Verify OTP for Retailer Login
const verifyOtpHandler = async (req, res) => {
    const { phoneNumber, userOTP } = req.body;
    try {

        const storedOTP = otpStore[phoneNumber];


        if (storedOTP && userOTP === storedOTP) {
            // OTP is valid
            delete otpStore[phoneNumber]; // Remove the OTP after successful verification

            // Check if the retailer exists
            const retailer = await Retailer.findOne({ phoneNo: phoneNumber });

            if (!retailer) {
                return res.status(401).json({
                    message: 'Retailer not found for the provided mobile number',
                    success: false,
                });
            }

            // Generate and send a token for retailer login
            const token = generateAndSendToken(retailer);
            return res.json({
                message: 'OTP verified successfully. Retailer login successful',
                success: true,
                token,
                retailer
            });
        } else {
            // Invalid OTP
            return res.status(400).json({
                message: 'Invalid OTP',
                success: false,
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
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

module.exports = {
    sendOTPHandler,
    verifyOtpHandler,
};
