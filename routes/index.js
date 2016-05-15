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
    Thread.find(function(err,threads){
        res.render('index', { title: 'Forum with Voting',threads })
    });
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

router.post('/submitthread', function(req,res,next){
    var newThread = Thread(req.body);
    newThread.save(function(err){
        if(err) throw err;
    });
    var newMessage = ThreadMessage(req.body);
    newMessage._thread = newThread;
    newMessage.save(function(err){
        if(err) throw err;
    });
    res.redirect('/');

});

router.post('/saveMessage', function(req,res,next){
    var data = {
        _thread: req.body.id,
        message: req.body.message,
        user: req.session.user
    };

    var newMessage = ThreadMessage(data);
    newMessage.save(function(err){
        if(err) throw err;
        res.redirect('/threads/'+req.body.id);
    });
});


router.get('/threads/:id', function(req,res,next){
    var id = req.params.id;
    var user = req.session.user;
    var thread_title;
    Thread.findById(id,function(err, thread){
        if (err) throw err;
        thread_title = thread.title;
    });
    ThreadMessage.find({'_thread':id} ,function(err, messages){
        res.render('thread_related/display_thread',{title: thread_title, messages, threadId: id, user})
    });
});

router.post('/editmessage', function(req,res, next){

});

router.post('/upvotethread/:id', function(req,res,next){
    Thread.findById(req.params.id, function(err, thread){
        if (err) throw err;
        thread.upvotes = thread.upvotes+1;
        thread.save();
        res.redirect('/');
    })
});

router.post('/upvotemessages/:id', function(req, res, next){
    ThreadMessage.findById(req.params.id, function(err, message){
        if (err) throw err;
        message.upvotes = message.upvotes+1;
        message.save();
        res.redirect('/threads/'+req.body.id);
    })

});

router.post('/downvotemessages/:id', function(req, res, next){
    ThreadMessage.findById(req.params.id, function(err, message){
        if (err) throw err;
        message.upvotes = message.upvotes-1;
        message.save();
        res.redirect('/threads/'+req.body.id);
    })
});

router.post('/downvotethread/:id', function(req, res, next){
    Thread.findById(req.params.id, function(err, thread){
        if (err) throw err;
        thread.upvotes = thread.upvotes-1;
        thread.save();
        res.redirect('/threads/'+req.body.id);
    })
});

module.exports = router;
