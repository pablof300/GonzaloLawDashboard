const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  clients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

exports.Model = mongoose.model("Admin", Schema);
