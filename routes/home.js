const model = require('../config/database');

var express = require('express');
var router = express.Router();

// Home
// router.get('/', function(req, res){
//   res.render('home/welcome');
// });

router.get('/', function(req, res){
  model.query(`SELECT * FROM community WHERE star >= 4`, (err, rows) => {
    if(err) throw err;
    if (req.user == undefined) {
      res.render('home/welcome', {logged: false, rows:rows});
    }
    else {
      res.render('home/welcome', {logged: true, user: req.user, rows:rows});
    }
  })
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