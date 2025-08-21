
const status = require("http-status-codes");
const Session = require("../modals/SessionSchema");
const User=require("../modals/UserSchema")

// Get all public sessions (only published)

const getPublicSessions = async (req, res) => {
  
  try {
    const sessions = await Session.find({ status: "published" }).sort({ createdAt: -1 });
    res.status(status.StatusCodes.OK).json({ sessions });
  } catch (error) {
    // console.error("Error fetching public sessions:", error);
    res.status(status.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Server error" });
  }
};

//  Get all sessions of the logged-in user (both draft + published)

const getUserSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user_id: req.user.id }).sort({ updatedAt: -1 });
    res.status(status.StatusCodes.OK).json({ sessions });
  } catch (error) {
    // console.error("Error fetching user sessions:", error);
    res.status(status.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Server error" });
  }
};

//  Get a single session by ID (user-owned session)

const getUserSessionById = async (req, res) => {

  try {
    const session = await Session.findOne({ _id: req.params.id });
    // console.log( req.params.id)
    // console.log(session)
    if (!session) {
      return res.status(status.StatusCodes.NOT_FOUND).json({ error: "Session not found" });
    }

    res.status(status.StatusCodes.OK).json({ session });
  } catch (error) {
    // console.error("Error fetching session:", error);
    res.status(status.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Server error" });
  }
};

// Save or update a session as draft
const saveDraftSession = async (req, res) => {
  try {
    const { id, title, tags, json_file_url } = req.body; 
// console.log( req.body)
    // console.log( req.user.id)
    // If ID exists then update existing draft
    if (id) {
      const updatedSession = await Session.findOneAndUpdate(
        { _id: id, user_id: req.user.id },
        { title, tags, json_file_url, status: "draft" },
        { new: true }
      );
      // console.log("updated session"+updatedSession)

      if (!updatedSession) {
        return res
          .status(status.StatusCodes.NOT_FOUND)
          .json({ error: "Session not found" });
      }

      return res
        .status(status.StatusCodes.OK)
        .json({ message: "Draft updated", session: updatedSession });
    }

    // Else create a new draft
    const newSession = new Session({
      user_id: req.user.id,
      title,
      tags,
      json_file_url,
      status: "draft",
    });

    const savedSession = await newSession.save();

    return res
      .status(status.StatusCodes.CREATED)
      .json({ message: "Draft saved", session: savedSession });
  } catch (error) {
    // console.error("Error saving draft:", error);
    res
      .status(status.StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Server error" });
  }
};



//  Publish a session (create new or update existing)

const publishSession = async (req, res) => {
  try {
    const { title, tags ,json_file_url} = req.body;

    // first checking existing session
    if (req.body.id) {
      const updatedSession = await Session.findOneAndUpdate(
        { _id: req.body.id, user_id: req.user.id },
        { title, tags, json_file_url,status: "published" },
        { new: true }
      );
      return res.status(status.StatusCodes.OK).json({ message: "Session published", session: updatedSession });
    }
// creating new session
    const newSession = new Session({
      user_id: req.user.id,
      title,
      tags,
      json_file_url,
      status: "published",
    });

    await newSession.save();
    res.status(status.StatusCodes.CREATED).json({ message: "Session published", session: newSession });
  } catch (error) {
    // console.error("Error publishing session:", error);
    res.status(status.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Server error" });
  }
};
// Delete a session (user-owned)
const deleteSession = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the session and ensure it belongs to the logged-in user
    const session = await Session.findOne({ _id: id, user_id: req.user.id });
    if (!session) {
      return res
        .status(status.StatusCodes.NOT_FOUND)
        .json({ success: false, error: "Session not found or unauthorized" });
    }

    await Session.deleteOne({ _id: id });
    return res
      .status(status.StatusCodes.OK)
      .json({ success: true, message: "Session deleted successfully" });
  } catch (error) {
    // console.error("Error deleting session:", error);
    return res
      .status(status.StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: "Server error" });
  }
};


module.exports = {deleteSession,
  getPublicSessions,
  getUserSessions,
  getUserSessionById,
  saveDraftSession,
  publishSession,
};
