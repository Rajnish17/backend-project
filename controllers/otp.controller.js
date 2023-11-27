const Retailer = require("../models/retailer.model");
const { sendOTP, generateOTP } = require("../utils/otp.utils");
const jwt = require("jsonwebtoken");

let otpStore = {}; // Object to store OTPs for each phone number

const sendOTPHandler = async (req, res) => {
    try {
        const { phoneNumber } = req.body;
        if (!phoneNumber) {
            return res.status(400).json({
                success: false,
                message: "Please enter a phone number",
            });
        }
        let retailer = await Retailer.findOne({ phoneNumber });
        if(!retailer){
            return res.status(400).json({
                success:false,
                message:"No such user found"
            })
        }
        const otp = generateOTP(); // Generate the OTP
        await sendOTP(phoneNumber, otp); // Send the OTP
        otpStore[phoneNumber] = otp; // Store the OTP in the object
        res.status(200).json({
            success: true,
            message: "OTP sent successfully",
        });

    } catch (error) {
        // console.error(error);
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

        if (!storedOTP) {
            return res.status(400).json({
                success: false,
                message: "Please send an OTP first",
            });
        }

        if (userOTP === storedOTP) {
            // OTP is valid
            delete otpStore[phoneNumber]; // Remove the OTP after successful verification

            // Check if the retailer exists
            const retailer = await Retailer.findOne({phoneNumber:phoneNumber });

            if (!retailer) {
                return res.status(401).json({
                    message: 'Retailer not found for the provided mobile number',
                    success: false,
                });
            }

            // Generate and send a token for retailer login
            const token = generateAndSendToken(retailer);
            const role= retailer.role;
            return res.json({
                message: 'OTP successfully verified.',
                success: true,
                data:{ token,role}
               
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
            expiresIn: "7d", // Token expiration time (adjust as needed)
        }
    );
};

module.exports = {
    sendOTPHandler,
    verifyOtpHandler,
};
