var express = require("express");
var router = express.Router();
var Question = require("../models/question");
var Answer = require("../models/answer");
var authMiddleWare = require("../middleware/authmiddleware");


// /v1/question/:id/add
router.post("/:id/add", authMiddleWare.authenticate, authMiddleWare.isAdmin, function(req, res){
  // find the specific question by id
  Question.findById(req.params.id, function(err, question) {
    if(err) {
      return res.send(err);
    }
    var newAnswer = new Answer();
    newAnswer.text = req.body.text;
    newAnswer.question = question._id;
    newAnswer.author = req.user.id;
    newAnswer.save(function(err) {
      if (err) {
        return res.send(err);
      }
      question.answer = newAnswer;
      question.save(function(err) {
        if (err) {
          return res.send(err);
        }
        res.json("msg: Answer and question were created and saved!")
      });
    });
  });
});


module.exports = router;
