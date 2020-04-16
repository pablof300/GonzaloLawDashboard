const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  code: { type: String, required: true },
  sendTime: {type: Number, required: true},
  expireTime: {type: Number, required: true},
  userID: {type: String, required: true},
});

exports.Code = mongoose.model("Code", Schema);
