var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var User = require("./user");
var Question = require("./question");

var answerSchema = mongoose.Schema;

var answerSchema = new Schema({
  text: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref : "User"
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question"
  },
  date: {type: Date, default:Date.now()}
});

module.exports = mongoose.model("Answer", answerSchema);
