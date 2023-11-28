const jwt = require("jsonwebtoken");


const isAdmin = (req, res, next) => {
  let token = req.headers.token;

  try {
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Please provide a token",
      });
    }

    token = token.split(" ")[1];

    let user = jwt.verify(token, process.env.JWT_SECRET);
    if (user.role === "admin") {
      req.user = user; // Optionally, you can set the user information in req.user
      next();
    } else {
      res.status(403).json({
        success: false,
        message: "You are not authorized",
      });
    }
  } catch (error) {
    // console.error(error);
    if (error.name === "JsonWebTokenError") {
      res.status(401).json({
        success: false,
        message: "Invalid token format",
      });
    } else if (error.name === "TokenExpiredError") {
      res.status(401).json({
        success: false,
        message: "Token has expired",
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
};


const isRetailer = (req, res, next) => {
  let token = req.headers.token;

  try {
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token not provided",
      });
    }

    token = token.split(" ")[1];

    let user = jwt.verify(token, process.env.JWT_SECRET);
    if (user.role === "retailer") {
      req.user = user; // Optionally, you can set the user information in req.user
      next();
    } else {
      res.status(403).json({
        success: false,
        message: "You are not authorized",
      });
    }
  } catch (error) {
    // console.error(error);
    if (error.name === "JsonWebTokenError") {
      res.status(401).json({
        success: false,
        message: "Invalid token format",
      });
    } else if (error.name === "TokenExpiredError") {
      res.status(401).json({
        success: false,
        message: "Token has expired",
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
};


const isCustomer = (req, res, next) => {
  let token = req.headers.token;

  try {
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Please provide a token",
      });
    }

    token = token.split(" ")[1];

    let user = jwt.verify(token, process.env.JWT_SECRET);
    if (user.role === "customer") {
      req.user = user; // Optionally, you can set the user information in req.user
      next();
    } else {
      res.status(403).json({
        success: false,
        message: "You are not authorized",
      });
    }
  } catch (error) {
    // console.error(error);
    if (error.name === "JsonWebTokenError") {
      res.status(401).json({
        success: false,
        message: "Invalid token format",
      });
    } else if (error.name === "TokenExpiredError") {
      res.status(401).json({
        success: false,
        message: "Token has expired",
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
};

module.exports = {
  isAdmin,
  isRetailer
};
