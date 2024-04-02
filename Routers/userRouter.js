const express = require("express");
const {
  loginController,
  registerController,
  fetchAllUsersController,
} = require("../Controller/userController");
const { protect } = require("../Middleware/authMiddleware");
const router = express.Router();

router.post("/login", loginController);
router.post("/register", registerController);
router.get("/fetchUsers", protect, fetchAllUsersController);

module.exports = router;
