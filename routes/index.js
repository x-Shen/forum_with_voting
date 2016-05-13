var express = require('express');
var router = express.Router();
var session = require('client-sessions');
var User = require('../db_models/userModel');
var Thread = require('../db_models/threadModel');
var ThreadMessage = require('../db_models/threadMessageModel');


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Forum with Voting' });
});

router.get('/signup',function(req, res, next){
  res.render('user_related/signup.ejs', {title:'Sign Up', sub_title:'Please Fill the form to Sign Up'});
});

router.get('/login', function(req, res, next){
  res.render('user_related/login.ejs', {title:'Log In', sub_title:'Please Fill the form to Log In', error:'None'})
});

router.post('/saveUser', function(req,res,next){
  var newUser = new User(req.body);
  newUser.save(function(err){
    if(err) throw err;
  });
  res.redirect('/');
});

router.post('/userlogin',function(req,res,next){

  User.findOne({ email: req.body.email }, function(err, user){
    if (!user){
      res.render('login',{title:'Log In to Message Board',sub_title:'Please Fill the form to Log In',error:'Username Does Not Exist'});
    }
    else{
      if(req.body.password === user.password){
        req.session.user = user;
        res.redirect('/');
      }
      else{
        res.render('login',{title:'Log In to Message Board',sub_title:'Please Fill the form to Log In', error:'Wrong Password'});
      }
    }
  })
});


router.get('/newthread', function(req, res, next){
    var thread = {
        title: '',
        CreatedAt: '',
        id: '',
        user: '',
        upvotes:0
    };
    var user = req.session.user;
    if(!user){
        res.redirect('/login');
    }
    res.render('thread_related/new_thread', {title: 'Start a New Thread!', thread, user})

});

router.get('/editthread', function(req, res, next){

});

router.get('/submitthread', function(req,res,next){

});

router.post('/editmessage', function(req,res, next){

});

router.post('/upvotethread/:id', function(req,res,next){

});

router.post('/upvotemessage/:id', function(req, res, next){

});

router.post('/downvotethread/:id', function(req, res, next){

});

module.exports = router;
