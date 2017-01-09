var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var CodeSchema = new Schema({
  code: String,
  role: String,
  taken: Boolean
});

module.exports = mongoose.model("Code", CodeSchema);
