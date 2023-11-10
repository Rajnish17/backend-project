const express =require("express");
const router =express.Router();
const { getAllUsers,getUserById,updateUserById,deleteUserById }= require("../controllers/userdata.controller")



// CRUD operations for users
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUserById);
router.delete('/users/:id', deleteUserById);


module.exports =router;






    
    
    