var express = require("express");
var router = express.Router();
var authMiddleWare = require("../middleware/authmiddleware");
var Code = require("../models/codes")

//add a code
// /v1/code/add
router.post("/add", function(req, res){
  var newCode = new Code();
  newCode.code = req.body.code;
  newCode.role = req.body.role;
  newCode.taken = "false";

  newCode.save(function(err) {
    if(err) {
      return res.send(err);
    }
    res.send("New code was created");
  });
});

//get all codes
// /v1/codes/
router.get("/", function(req, res){
  Code.find({}, function(err, codes) {
    if (err) {
      return res.send(err);
    }
    res.json(codes);
  });
});


module.exports = router;
