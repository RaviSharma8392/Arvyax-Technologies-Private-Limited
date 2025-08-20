const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");

const userRouter = express.Router();

// User registration
userRouter.post("/register", registerUser);

// User login
userRouter.post("/login", loginUser);

module.exports = userRouter;
