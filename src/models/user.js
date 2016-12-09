var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passprtLocalMongoose = require("passport-local-mongoose");

var userSchema = new Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  admin: Boolean
});

//accountSchema.plugin(passportLocalMongoose);
userSchema.plugin(passprtLocalMongoose);

module.exports = mongoose.model("User", userSchema);
