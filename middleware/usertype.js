const jwt = require("jsonwebtoken");

const isAdmin = (req, res, next) => {
  let token =req.headers.token
  
  try {
    token= token.split(" ")[1];
    if(token){
      let user=jwt.verify(token,process.env.JWT_SECRET);
      req.user=user.role
      
      if(req.user =="admin"){

        next();
      }else{
        res.status(400).json({
          success:false,
          message:"you are not authorised"
        })
      }
    }
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success:false,
    })
  }
};

const isRetailer = (req, res, next) => {
  let token =req.headers.token
  
  try {
    token= token.split(" ")[1];
    if(token){
      let user=jwt.verify(token,process.env.JWT_SECRET);
      // req.user=user.role
      // console.log(user);
      console.log(req.user);
      if(req.user =="retailer"){

        next();
      }else{
        res.status(400).json({
          success:false,
          message:"you are not authorised"
        })
      }
    }
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success:false,
    })
  }
};

const isCustomer = (req, res, next) => {
  let token =req.headers.token
  
  try {
    token= token.split(" ")[1];
    if(token){
      let user=jwt.verify(token,process.env.JWT_SECRET);
      req.user=user.role
      // console.log(user);
      // console.log(req.user);
      if(req.user =="customer"){

        next();
      }else{
        res.status(400).json({
          success:false,
          message:"you are not authorised"
        })
      }
    }
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success:false,
    })
  }
};

module.exports = {
  isAdmin,
  isRetailer,
  isCustomer
};
