const jwt = require("jsonwebtoken");
const { findByPrimaryKey } = require("../services/authServices");

const auth = async (req, res, next) => {
  try {
    let token;

    let authHeader = req.headers.Authorization || req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if(!decoded) return res.status(400).json({ message: "User token is not authorized"});
      const user = await findByPrimaryKey(decoded.id);

      if(!user) return res.status(400).json({ message: "Invalid User"})

        req.userId = user.id;
        req.userRole = user.role;

        next();
    }

    if (!token) {
      return res.status(400).json({ message: "No token" });
    }
  } catch (error) {
    res.status(500).json({ message: "User token is not authorized"});
  }
};

module.exports = auth;
