const express = require('express');
const router = express.Router();
const {sendOTPHandler,verifyOtpHandler} = require("../controllers/otp.controller"); // Adjust the path as needed

// Route for sending OTP
// router.post('/sendotp', async (req, res) => {
//   const recipientPhoneNumber = req.body.phoneNumber; // Get the recipient's phone number from the request body
//   const otp = otpController.generateOTP();
//   try {
//     await otpController.sendOTP(recipientPhoneNumber, otp);
//     res.json({ message: 'OTP sent successfully' });
//   } catch (error) {
//     res.status(500).json({
//       message:error,
//       success:false
//     });
//     console.log(error);
//   }
// });
router.post("/sendotp",sendOTPHandler);
router.post("/verifyotp",verifyOtpHandler);

module.exports = router;
