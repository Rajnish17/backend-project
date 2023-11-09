const express =require("express");
const router =express.Router();
const {Signup,Login} =require("../controllers/auth.controllers");




router.post("/signup",Signup);
router.post("/login",Login);


module.exports =router;