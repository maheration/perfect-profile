var express = require("express");
var app = express();
var mongoose = require("mongoose");
var http = require("http");
var bodyParser = require("body-parser");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var User = require("./src/models/user");


//routes
var questionRoutes = require("./src/routes/question");
var answerRoutes = require("./src/routes/answer");
var planRoutes = require("./src/routes/plan");
var accountRoutes = require("./src/routes/account");

//connect mongoose
mongoose.connect("mongodb://localhost/perfect-profile");
var server = http.createServer(app);


//passport config
app.use(passport.initialize());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



//middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



//config routes
app.use("/v1/question", questionRoutes);
app.use("/v1/question/", answerRoutes);
app.use("/v1/plan", planRoutes);
app.use("/v1/account/", accountRoutes);

server.listen(3000, function(){
  console.log("Server is Onnnnnnnnn!");
});

module.exports = app;
