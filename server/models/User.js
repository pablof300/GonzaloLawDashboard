const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
});

exports.Model = mongoose.model("User", Schema);
