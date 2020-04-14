const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  secondName: { type: String, required: true },
  middleName: { type: String },
  contact:{
    email: {type: String},
    phone: {type: Number}
  },
  imageUrl: {type: String},
  clients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

exports.Model = mongoose.model("Admin", Schema);
