var mongoose = require("mongoose");
var express = require("express");
var User = require("../models/user");
var bodyParser = require("body-parser");
var passport = require("passport");
var router = express.Router();
var authMiddleWare = require("../middleware/authmiddleware");


router.post("/register", function(req,res){
  User.register(new User({username: req.body.username,
                          admin: req.body.admin,
                          firstName: req.body.firstName,
                          lastName: req.body.lastName}), req.body.password, function(err, account) {
                            if(err) {
                              return res.send(err);
                            }
                            passport.authenticate("local", {session: false})(req, res, function(){
                              res.status(200).send("Account was created");
                            });

  });
});

router.post("/login", passport.authenticate("local",
  {session: false,
   scope:[]}), authMiddleWare.generateAccessToken, authMiddleWare.respond);


   //logout
  router.get("/logout", authMiddleWare.authenticate, function(req, res){
     req.logout();
     res.status(200).send("Logged out BITCH");
   });

 router.get("/me", authMiddleWare.authenticate, function(req, res) {
     res.status(200).json(req.user);
   });

//get all users
// /v1/accout/
router.get("/allusers", authMiddleWare.authenticate, authMiddleWare.isAdmin, function(req, res){
  User.find({}, function(err, users){
    if (err) {
      return res.send(err);
    }
    res.json(users);
  });
});

//get author name
// /v1/account/:id(authorId)/getauthorname
router.get("/:id/getauthorname", authMiddleWare.authenticate, function(req, res){
  User.findById(req.params.id, function(err, author) {
    if (err) {
      return res.send(err);
    }
    res.json({
      firstName: author.firstName,
      lastName: author.lastName
    });
  });
});

module.exports = router;
