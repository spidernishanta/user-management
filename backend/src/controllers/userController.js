const User = require("../models/User");
const mongoose = require("mongoose");

// create user
const createUser = async (req, res) => {
  try {
    const { name, email, age } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        message: "Validation Error",
        details: "Name and email are required fields",
      });
    }

    const user = await User.create({
      name: name.trim(),
      email: email.trim(),
      age: age ? parseInt(age) : undefined,
    });

    res.status(201).json(user);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation Failed",
        details: error.message,
      });
    }

    res.status(500).json({
      message: "Server Error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).lean();

    return res.status(200).json({
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({
      message: "Server Error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// fetch user
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "invalid user id" });
    }
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: "user not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "invalid user id" });
    }
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedUser) return res.status(404).json({ error: "user not found" });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "invalid user id" });
    }
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) return res.status(404).json({ error: "user not found" });
    res.json({ message: "user deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createUser, getAllUsers, getUser, updateUser, deleteUser };
