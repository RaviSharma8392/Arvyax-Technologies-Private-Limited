const express = require("express");
const {
  getPublicSessions,
  getUserSessions,
  getUserSessionById,
  saveDraftSession,
  publishSession,
} = require("../controllers/sessionController");
const authMiddleware = require("../middlewares/authMiddleware");

const sessionRouter = express.Router();
sessionRouter.use(authMiddleware)
// Public wellness sessions
sessionRouter.get("/sessions", getPublicSessions);

// User’s own sessions
sessionRouter.get("/my-sessions", getUserSessions);

// View a single user session
sessionRouter.get("/my-sessions/:id", getUserSessionById);

// Save or update a draft session
sessionRouter.post("/my-sessions/save-draft", saveDraftSession);

// Publish a session
sessionRouter.post("/my-sessions/publish", publishSession);

module.exports = sessionRouter;
