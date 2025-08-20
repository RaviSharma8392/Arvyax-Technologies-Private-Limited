const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  json_file_url: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["draft", "published"],
    default: "draft",
  },}
  
,{
    timestamps:true});



module.exports = mongoose.model("Session", sessionSchema);
