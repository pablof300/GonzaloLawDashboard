const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  url: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String },
  size: { type: String }
});

exports.Model = mongoose.model("files", Schema);
