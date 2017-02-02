var mongoose = require("mongoose");
var express = require("express");
var User = require("../models/user");
var bodyParser = require("body-parser");
var passport = require("passport");
var apn = require("apn")
var router = express.Router();
var authMiddleWare = require("../middleware/authmiddleware");


router.post("/register", function(req,res){
  User.register(new User({username: req.body.username,
                          admin: req.body.admin,
                          firstName: req.body.firstName,
                          lastName: req.body.lastName,
                          deviceToken: req.body.deviceToken}), req.body.password, function(err, account) {
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
router.get("/", authMiddleWare.authenticate, authMiddleWare.isAdmin, function(req, res){
  User.find({admin: false}, function(err, users){
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

//Send Notification
// /v1/account/patientId/send_notif

router.get("/:patientId/send_notif", authMiddleWare.authenticate, function(req,res) {
  User.findById(req.params.patientId, function(err, user){
    if (err) {
      return res.send(err);
    }
    var token = user.deviceToken;
    // // Set up apn with the APNs Auth Key
    var apnProvider = new apn.Provider({
         token: {
            key: 'apns.p8', // Path to the key p8 file
            keyId: 'MLR78GR333', // The Key ID of the p8 file (available at https://developer.apple.com/account/ios/certificate/key)
            teamId: 'J46335Z6MG', // The Team ID of your Apple Developer Account (available at https://developer.apple.com/account/#/membership/)
        },
        production: false // Set to true if sending a notification to a production iOS app
    });
    // // Prepare a new notification
    var notification = new apn.Notification();
    // // Specify your iOS app's Bundle ID (accessible within the project editor)
    notification.topic = 'com.maheration.Profile';
    // // Set expiration to 1 hour from now (in case device is offline)
    notification.expiry = Math.floor(Date.now() / 1000) + 3600;
    // // Set app badge indicator
    notification.badge = 3;
    // // Play ping.aiff sound when the notification is received
    notification.sound = 'ping.aiff';
    // // Display the following message (the actual notification text, supports emoji)
    notification.alert = 'Your profile has been updated 😊';
    // // Send any extra payload data with the notification which will be accessible to your app in didReceiveRemoteNotification
    notification.payload = {id: 123};
    
    // // Actually send the notification
    apnProvider.send(notification, token).then(function(result) {
        // Check the result for any failed devices
        console.log(result);
    });
    return res.send("Notification was sent!! YAAAY");
  });
});

//update deviceToken
// /v1/account/:ptId/set_token
router.put("/:ptId/set_token", authMiddleWare.authenticate, function(req, res){
  User.findById(req.params.ptId, function(err, user){
    if (err) {
      return res.send(err);
    }
    user.deviceToken = req.body.deviceToken;
    user.save(function(err){
      if (err) {
        return res.send(err);
      }
      res.send("Device Token was updated");
    });
  });
});

module.exports = router;
