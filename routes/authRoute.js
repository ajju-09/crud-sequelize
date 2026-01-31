const express = require("express");
const { body } = require("express-validator");
const validate = require("../middlewares/validate");
const { register, login } = require("../controllers/authController");

const router = express.Router();

router.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  validate,
  register,
);

router.get("/login", body("email").isEmail(), validate, login);

module.exports = router;
