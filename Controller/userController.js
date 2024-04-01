const express = require("express");
const UserModel = require("../Models/userModel");
const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../Config/generateToken");

// Login Controller
const loginController = () => {};

// Registration Controller
const registerController = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //Checking All fields
  if (!name || !email || !password) {
    res.send(400);
    throw Error("All Fields Are required");
  }

  //Pre existing user
  const userExist = await UserModel.findOne({ email });
  if (userExist) {
    throw new Error("User already exist");
  }

  //Pre existing user
  const userNameExist = await UserModel.findOne({ name });
  if (userNameExist) {
    throw new Error("UserName already exist");
  }

  //Create a new user in DB
  const newUser = await UserModel.create({ name, email, password });
  if (newUser) {
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: generateToken(newUser._id),
    });
  } else {
    res.status(400);
    throw new Error("Registration Failed");
  }
});

module.exports = { loginController, registerController };
