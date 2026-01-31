const express = require("express");
const {
  createUser,
  readAllUser,
  updateUser,
  deleteUser,
  readUserById,
} = require("../controllers/userController");
const auth = require("../middlewares/auth");
const router = express.Router();

router.post("/", createUser);
router.get("/getusers", readAllUser);
router.get("/getuser/:id", readUserById);
router.put("/updateuser/:id", updateUser);
router.delete("/deleteuser/:id", deleteUser);

module.exports = router;
