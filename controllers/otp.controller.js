const { sendOTP, generateOTP } = require("../utils/otp.utils");

let storedOTP = ""; // for verification of otp

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
        storedOTP = otp; // Store the OTP after it has been sent
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

// Verify OTP
const verifyOtpHandler = (req, res) => {
    const userOTP = req.body.otp;
    try {
        if (userOTP === storedOTP) {
            res.json({
                message: 'OTP verified successfully',
                success: true,
            });
        } else {
            res.status(400).json({
                message: 'Invalid OTP',
                success: false,
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

module.exports = {
    sendOTPHandler,
    verifyOtpHandler,
};
