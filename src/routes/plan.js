var express = require("express");
var router = express.Router();
var Plan = require("../models/plan");
var User = require("../models/user");
var authMiddleWare = require("../middleware/authmiddleware");


// /v1/plan/:id(userid)/add
router.post("/:id/add", authMiddleWare.authenticate, authMiddleWare.isAdmin, function(req, res){
  var newPlan = new Plan();
  newPlan.dx = req.body.dx;
  newPlan.labs = req.body.labs;
  newPlan.plan = req.body.plan;
  newPlan.patient = req.params.id;
  //add the author id to the newPlan
  newPlan.author = req.user.id;

  newPlan.save(function(err) {
    if (err) {
      return res.send(err);
    }
    res.send("New plan was saved BIATCH");
  });
});

// get one plan
// /v1/plan/:id(patientId)/
router.get("/:id", authMiddleWare.authenticate,function(req, res){
  Plan.find({patient: req.params.id}, function(err, plan){
    if (err) {
      return res.send(err);
    }
    res.json(plan);
  });
});

//Update
// /v1/plan/:id(patientId)
router.put("/:id", authMiddleWare.authenticate, authMiddleWare.isAdmin,function(req ,res) {
  Plan.findOne({patient: req.params.id}, function(err, foundPlan){
    if (err){
      return res.status(500).send(err);
    }
    foundPlan.dx = req.body.dx;
    foundPlan.plan = req.body.plan;
    foundPlan.labs = req.body.labs;
    foundPlan.author = req.user.id;
    foundPlan.save(function(err) {
      if (err) {
        return res.send(err);
      }
      res.send("Plan was updated!");
    });
  });
});





module.exports = router;
