const express = require("express");
const userRouter = require("./user");
const sessionRouter = require("./session");

const router = express.Router();

// Group routes under
router.use("/users", userRouter);
router.use("/sessions", sessionRouter);

module.exports = router;
