const express =require("express");
const router =express.Router();
const {Signup,Login,check} =require("../controllers/auth.controllers");





router.post("/signup",Signup);
router.post("/login",Login);
router.post("/check",check);


module.exports =router;