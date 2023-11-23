const express =require("express");
const router =express.Router();
const { getAllUsers,getUserById,updateUserById,deleteUserById }= require("../controllers/userdata.controller")
const {isAdmin} =require("../middleware/usertype")


// CRUD operations for users
router.get('/users',isAdmin, getAllUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUserById);
router.delete('/users/:id', deleteUserById);


module.exports =router; 