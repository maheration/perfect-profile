var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
var User = require("../models/user");

const TOKENTIME = 60*60*24*30;
const SECRET = "Ana a7san wa7ed";

let authenticate = expressJwt({ secret: SECRET });

let isAdmin = function(req, res, next) {
  if(req.isAuthenticated()) {
    User.findById(req.user.id, function(err, user){
      if (err) {
        return res.send(err);
      }
      if (user.admin === true) {
        next();
      } else {
        res.json({"msg": "You are not an admin"});
      }
    });
  }
}

let generateAccessToken = function(req, res, next) {
  req.token = req.token || {};
  req.token = jwt.sign({
    id: req.user.id
  }, SECRET, {
    expiresIn: TOKENTIME
  });
  next();
}

let respond = function(req, res) {
  res.status(200).json({
    user: req.user.username,
    isAdmin: req.user.admin,
    token: req.token,
    id: req.user.id
  });
}

module.exports = {
  authenticate,
  generateAccessToken,
  isAdmin,
  respond
};
