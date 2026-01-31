const bcrypt = require("bcrypt");
const generateJWT = require("../helper/generateToken");
const ApiError = require("../helper/apiError");
const {createAuthUser, findAuthUser} = require('../services/authServices');
const logger = require("../helper/logger");

// REGISTER
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw new ApiError("All fields are required", 400)
    }
    // hash password
    const hash = await bcrypt.hash(password, 10);
    // create user
    const data = {
      name, 
      email,
      password: hash
    }
    const user = await createAuthUser(data);

    res
      .status(200)
      .json({ message: "User register successfully", success: true, user });
  } catch (error) {
    res.status(500).json({ message: "SERVER ERROR", success: false });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const {email, password} = req.body;
    logger.info(`Login attempt : ${req.body.email}`)
    
    if(!email || !password) {
        throw new ApiError("All field are required", 400)
    }

    // user exists or not 
    const user = await findAuthUser(email);
    if(!user) {
        throw new ApiError("User not found", 404)
    }

    const match = await bcrypt.compare(password, user.password);

    if(!match) throw new ApiError("Password is invalid", 400)

    // assign token 
    const generator = {
      id: user.id
    }
    const token = generateJWT(generator);

    res.status(200).json({ message: "Login successfull", success: true, token})

  } catch (error) {
    res.status(500).json({ message: "SERVER ERROR", success: false });
  }
};

module.exports = { register, login }