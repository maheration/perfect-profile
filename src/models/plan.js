var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var User = require("./user");

var planSchema = new Schema({
  dx: String,
  plan: String,
  labs: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});


module.exports = mongoose.model("Plan", planSchema);
