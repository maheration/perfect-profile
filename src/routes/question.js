var express = require("express");
var router = express.Router();
var Question = require("../models/question");
var authMiddleWare = require("../middleware/authmiddleware");
var User = require("../models/user");

// /v1/question/add

router.post("/add", authMiddleWare.authenticate, function(req, res){
  let newQuestion = new Question();
  newQuestion.text = req.body.text;
  newQuestion.title = req.body.title;
  newQuestion.author = req.user.id;
  newQuestion.save(function(err) {
    if (err) {
      return res.send(err);
    }
    res.json(newQuestion);
    console.log("Question created perfectly!");

    //you need to add the author once you create the auth

  });
});

// /v1/question/:id/getall
router.get("/:id/getall", authMiddleWare.authenticate, function(req, res){
  Question.find({author: req.params.id}, function(err, questions) {
    if (err) {
      return res.send(err);
    }
    res.send(questions);
  });
});

//get one question and show the question and answer
// /v1/question/:id(questionid)/getone
router.get("/:id/getonequestion", authMiddleWare.authenticate ,function(req, res) {
  Question.findById(req.params.id).populate("answer").exec(function(err, question){
    if (err) {
      return res.send(err);
    }
    res.json(question);
  });
});


module.exports = router;
