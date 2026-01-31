const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    let token;

    let authHeader = req.headers.Authorization || req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(400).json("Invalid token");

        req.userId = decoded.id;

        next();
      });
    }

    if (!token) {
      return res.status(400).json({ message: "No token" });
    }
  } catch (error) {
    res.status(500).json({ message: "User token is not authorized"});
  }
};

module.exports = auth;
