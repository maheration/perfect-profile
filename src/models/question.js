var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var User = require("./user");
var Answer = require("./answer");

var questionSchema = new Schema({
  title: String,
  date: {type: Date, default: Date.now()},
  text: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }, //ref to user model
  answer: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Answer"
  }] //ref to answer model
});

module.exports = mongoose.model("Question", questionSchema);
