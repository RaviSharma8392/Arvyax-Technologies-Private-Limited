const mongoose = require("mongoose");
const serverConfig=require("./serverConfig")

const db_connection = async () => {
  try {
    await mongoose.connect(serverConfig.mongoURI);
    console.log("✅MongoDB connected Successfully");
  } catch (err) {
    console.error("❌MongoDB connection error:", err);
  }
};

module.exports = db_connection;
