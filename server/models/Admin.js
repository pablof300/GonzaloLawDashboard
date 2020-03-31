const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  secondName: { type: String, required: true },
  middleName: { type: String },
  imageUrl: {type: String},
  clients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]
  //calendar: figure out outlook integration
  //todoList: { type: [{ type: String }], required: false } //this might be wrong syntax, but I want to store an array of Strings for todo list
  //typeAdmin: {type: String, required: true} //Depending what kind of lawyer/website owner the person is
});

exports.Model = mongoose.model("Admin", Schema);
