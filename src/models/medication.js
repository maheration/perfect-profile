var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var User = require("./user");

var MedSchema = new Schema({
  name: String,
  disc: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref : "User"
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  updatedDate: String
});

module.exports = mongoose.model("Medication", MedSchema);
