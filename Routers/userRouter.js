const express = require("express");
const {
  loginController,
  registerController,
} = require("../Controller/userController");
const router = express.Router();

router.post("/login", loginController);
router.post("/register", registerController);

module.exports = router;
