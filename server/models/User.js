const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
   cases: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Case"
    }
  ]  
});

exports.Model = mongoose.model("User", Schema);
