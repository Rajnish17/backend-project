const express =require("express");
const router =express.Router();
const {Signup,Login,check} =require("../controllers/auth.controllers");
const {checkUserType} =require("../middleware/usertype")




router.post("/signup",Signup);
router.post("/login",checkUserType,Login);
router.post("/check",check);


module.exports =router;