const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  type: { type: String, required: true },
  startDate: { type: String, required: true },
  caseCompleted: { type: Boolean, required: true },
  steps: [
    {
      step: { type: String, required: true },
      date: { type: String, required: true },
      completed: { type: Boolean, required: true },
      stepDescription: { type: String},
      stepNumber: { type: String, required: true},
    }
  ]
  });


  //CANT Figure out how to get multiple indicies in the array to be populated
  //and show up in db
exports.Model = mongoose.model("Case", Schema);
