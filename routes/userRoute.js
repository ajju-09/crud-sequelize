const express = require("express");
const {
  createUser,
  readAllUser,
  updateUser,
  deleteUser,
  readUserById,
} = require("../controllers/userController");
const auth = require("../middlewares/auth");
const authorize = require("../middlewares/role");
const upload = require("../middlewares/upload");
const router = express.Router();

router.post("/", createUser);
router.get("/getusers", readAllUser);
router.get("/getuser/:id", readUserById);
router.put("/updateuser/:id", updateUser);
router.delete("/deleteuser/:id", auth, authorize("admin"), deleteUser);

router.post('/upload', upload.single('image'), (req, res) => {
  res.status(200).json({ message: "Image upload successfully"})
})

module.exports = router;
