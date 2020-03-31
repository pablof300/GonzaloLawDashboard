const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  secondName: { type: String, required: true },
  middleName: { type: String },
  otherName: { type: String },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: Number }
  },
  contact: {
    homePhone: { type: Number },
    workPhone: { type: Number },
    cellPhone: { type: Number },
    email: { type: String }
  },
  birthDate: { type: String },
  imageUrl: { type: String },
  files: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LocalFile"
    }
  ],
  cases: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Case"
    }
  ]
});

exports.Model = mongoose.model("User", Schema);
