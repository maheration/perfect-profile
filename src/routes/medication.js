var express = require("express");
var router = express.Router();
var Medication = require("../models/medication");
var User = require("../models/user");
var authMiddleWare = require("../middleware/authmiddleware");


//post a medication to a specific patient
// v1/meds/:id(patientId)/add

router.post("/:id/add", authMiddleWare.authenticate, authMiddleWare.isAdmin, function(req, res) {
  var newMed = new Medication();
  newMed.name = req.body.name;
  newMed.disc = req.body.disc;
  newMed.patientId = req.params.id;
  newMed.author = req.user.id;


  newMed.save(function(err) {
    if (err) {
      return res.send(err);
    }
    res.send("New med was saved BITCH!!!!");
  });
});

//GET meds for a patient
// /v1/meds/:id(patientId)/
router.get("/:id", authMiddleWare.authenticate, function(req, res){
  Medication.find({patientId: req.params.id}, function(err, meds) {
    if (err) {
      return res.send(err);
    }
    res.json(meds);
  });
});

//delete one drung
// /v1/meds/:medId/
router.delete("/:medId", authMiddleWare.authenticate, authMiddleWare.isAdmin, function(req,res) {
  Medication.findById(req.params.medId, function(err, med) {
    if (err) {
      return res.status(500).send(err);
    }
    if (med === null) {
      return res.status(404).send("Med was not found!");
    }
    Medication.remove({_id: req.params.medId}, function(err) {
      if (err) {
        return res.send(err);
      }
      res.send("Medication was removed");
    });
  });
});

//update the medication plan or name
// /v1/meds/:medId
router.put("/:medId", authMiddleWare.authenticate, authMiddleWare.isAdmin, function(req , res) {
  Medication.findById(req.params.medId, function(err, med){
    if (err) {
      return res.status(500).send(err);
    }
    med.name = req.body.name;
    med.disc = req.body.disc;
    med.author = req.user.id;

    med.save(function(err) {
      if (err) {
        return res.send(err);
      }
      res.send("Update was saved");
    });
  });
});





module.exports = router;
