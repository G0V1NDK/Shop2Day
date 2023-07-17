const jwt = require("jsonwebtoken");

require("dotenv").config();

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1]; // Authorization: 'Bearer TOKEN'
    
    if (!token) {
      throw new Error("Authentication failed!");
    }

    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET_KEY);
    req.userData = decodedToken.user;

    next();
  } catch (error) {
    error.message = "Authentication failed!";
    error.code = 403;

    return next(error);
  }
};
