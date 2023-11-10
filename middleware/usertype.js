const User = require("../models/user.model");

const checkUserType = async (req, res, next) => {
  const email = req.body.email;
  try {
    // Use findOne instead of find to get a single user
    const user = await User.findOne({ email });

    // Check if the user exists and has the role 'user'
    if (user && user.role === 'user') {
      next();
    } else {
      res.status(401).json({ error: "You are not authorized" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  checkUserType,
};
