const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  admins: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin"
    }
  ],
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

exports.Model = mongoose.model("Event", Schema);
