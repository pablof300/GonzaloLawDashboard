const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
{
  url: { type: String, required: true },
  name: { type: String, required: true },
  type: {type : String},
  fileSize: {type: String},
  key:{type: Number}
});

exports.Model = mongoose.model("Files", Schema);