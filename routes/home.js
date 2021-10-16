var express = require('express');
var router = express.Router();

// Home
// router.get('/', function(req, res){
//   res.render('home/welcome');
// });

router.get('/', function(req, res){
  if (req.user == undefined) {
    res.render('home/welcome', {logged: false});
  }
  else {
    res.render('home/welcome', {logged: true, user: req.user});
  }
});

router.get('/about', function(req, res){
  if (req.user == undefined) {
    res.render('home/welcome', {logged: false});
  }
  else {
    res.render('home/about', {logged: true, user: req.user});
  }
});

module.exports = router;