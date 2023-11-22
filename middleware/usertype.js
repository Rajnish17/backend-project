const jwt = require("jsonwebtoken");

const isAdmin = (req, res, next) => {
  let token =req.headers.token
  
  try {
    if (!token){
      return res.status(400).json({
        success:false,
        message:"please provide token"
      })
    }
    if(token){
      token= token.split(" ")[1];
      let user=jwt.verify(token,process.env.JWT_SECRET);
      // req.user=user.role
      
      if(user.role =="admin"){

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
  let token = req.headers.token;

  try {
    if (token) {
      // Check if the token has the expected format
      if (token.includes(" ")) {
        token = token.split(" ")[1];
        let user = jwt.verify(token, process.env.JWT_SECRET);
        
        // Uncomment the line below if you want to set req.user to user.role
        // req.user = user.role;

        console.log(user,user.role);

        if (user.role === "retailer") {
          next();
        } else {
          res.status(400).json({
            success: false,
            message: "You are not authorized",
          });
        }
      } else {
        res.status(400).json({
          success: false,
          message: "Invalid token format",
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: "Token not provided",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


const isCustomer = (req, res, next) => {
  let token =req.headers.token
  
  try {
    if (!token){
      return res.status(400).json({
        success:false,
        message:"please provide token"
      })
    }
    if(token){
      token= token.split(" ")[1];
      let user=jwt.verify(token,process.env.JWT_SECRET);
      // req.user=user.role
      // console.log(user);
      // console.log(req.user);
      if(user.role =="customer"){

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
