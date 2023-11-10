const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const{sendOTP}=require("./otp.controller");

//signup controller here
const Signup = async (req, res) => {
    const { firstName, lastName, email, phoneNo, address, state, city, block, pinCode, landmark, password,role} = req.body;

    // Check if any of the required parameters are missing
    if (!firstName || !lastName || !email || !phoneNo || !address || !state || !city || !block || !pinCode || !password ||!role) {
        return res.status(400).json({
            success: false,
            message: "Please provide all required details",
        });
    }

    try {
        // Check if the user with the provided email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User with this email already exists",
            });
        }
        if(password.length < 8){
            return res.status(400).json({
                success: false,
                message: "password length should be greater than 8 character",
            });
        }

        // Hash the user's password before saving it to the database
        const saltRounds = 10; // You can adjust the number of salt rounds
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user instance with the hashed password
        const newUser = new User({
            firstName,
            lastName,
            email,
            phoneNo,
            address,
            state,
            city,
            block,
            pinCode,
            landmark,
            role,
            password: hashedPassword,
        });

        // Save the new user to the database
        await newUser.save();

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: newUser,
        });
    } catch (error) {
        // console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error:error
        });
    }
};


//Login controller here
const Login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user provided both email and password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide both email and password",
            });
        }

        // Find the user by email
        const user = await User.findOne({ email });

        // Check if the user exists
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "user not found",
            });
        }

        // Check if the password matches
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid  password",
            });
        }

        // User is authenticated; generate a JWT token
        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email,
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
        // console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error:error
        });
    }
};

const check=async(req,res)=>{
    const phoneNumber=req.body.phoneno;
try {
    await sendOTP(phoneNumber);
    res.status(200).json({
        success:true,
        message:"otp sent"
    })
} catch (error) {
    // console.log(error);
    res.status(500).json({
        success: false,
        message: "Internal server error",
        error:error
    });
}
}


module.exports = {
    Signup,
    Login,
    check
};
