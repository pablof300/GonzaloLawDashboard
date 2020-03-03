const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
{
  url: { type: String, required: true },
  name: { type: String, required: true },
  userID: {type: String, required: true},
  fileSize: {type: Number},
  key:{type: Number}
});

exports.Model = mongoose.model("Files", Schema);