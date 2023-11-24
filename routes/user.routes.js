const express =require("express");
const router =express.Router();
const { getAllUsers,getUserById,updateUserById,deleteUserById }= require("../controllers/userdata.controller")
const {isAdmin} =require("../middleware/usertype")


// CRUD operations for users
router.get('/getall',isAdmin, getAllUsers); //need to correct this 
router.get('/getone/:id', getUserById);
router.put('/update/:id', updateUserById);
router.delete('/delete/:id', deleteUserById);


module.exports =router; 