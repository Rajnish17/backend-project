const express = require('express');
const router = express.Router();
const {sendOTPHandler,verifyOtpHandler} = require("../controllers/otp.controller");


router.post("/sendotp",sendOTPHandler);
router.post("/verifyotp",verifyOtpHandler);


module.exports = router;
