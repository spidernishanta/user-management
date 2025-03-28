const express = require("express");
const router = express.Router();
const { validateUser } = require("../middleware/validateUser"); // middleware
const {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

// middleware added to POST and PUT routes
router.post("/users/create", validateUser, createUser);
router.get("/users", getAllUsers);
router.get("/users/:id", getUser);
router.put("/users/:id", validateUser, updateUser);
router.delete("/users/:id", deleteUser);

module.exports = router;
