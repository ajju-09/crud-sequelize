const db = require("../models/index");
const {
  createAuthUser,
  findAll,
  findByPrimaryKey,
  Update,
  Delete,
} = require("../services/authServices");
const User = db.Users;

// CREATE
const createUser = async (req, res) => {
  try {
    const data = req.body;
    const user = await createAuthUser(data);
    res
      .status(200)
      .json({ message: "User created successfully", success: true, user });
  } catch (error) {
    console.log("SERVER ERROR");
    res.status(500).json({ message: "SERVER ERROR ", success: false });
  }
};
// READ ALL
const readAllUser = async (req, res) => {
  try {
    const data = await findAll();
    res.status(200).json({ message: "All users", success: true, data });
  } catch (error) {
    console.log("SERVER ERROR");
    res.status(500).json({ message: "SERVER ERROR ", success: false });
  }
};
// READ ONE
const readUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await findByPrimaryKey(id);
    res.status(200).json({ message: "Get user by id", success: true, data });
  } catch (error) {
    console.log("SERVER ERROR");
    res.status(500).json({ message: "SERVER ERROR ", success: false });
  }
};
// UPDATE
const updateUser = async (req, res) => {
  try {
    const data = req.body;
    const id = req.params.id;
    await Update(data, id);
    res
      .status(200)
      .json({ message: "User update successfully", success: true });
  } catch (error) {
    console.log("SERVER ERROR");
    res.status(500).json({ message: "SERVER ERROR ", success: false });
  }
};
// DELETE
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await Delete(id);
    res.status(200).json({ message: "Deleted Successfully", success: true });
  } catch (error) {
    console.log("SERVER ERROR");
    res.status(500).json({ message: "SERVER ERROR ", success: false });
  }
};

module.exports = {
  createUser,
  readAllUser,
  readUserById,
  updateUser,
  deleteUser,
};
