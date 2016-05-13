var express = require('express');
var router = express.Router();

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

router.get('/newthread', function(req, res, next){
  
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
