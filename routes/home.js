const model = require('../config/database');

var express = require('express');
var router = express.Router();

// Home
// router.get('/', function(req, res){
//   res.render('home/welcome');
// });

// router.get('/', function(req, res){
//   model.query(`SELECT * FROM community WHERE star >= 4`, (err, rows) => {
//     if(err) throw err;
//     if (req.user == undefined) {
//       res.render('home/welcome', {logged: false, rows:rows});
//     }
//     else {
//       res.render('home/welcome', {logged: true, user: req.user, rows:rows});
//     }
//   })
// });
function dateFormat(date) {
  var year = date.getFullYear();
  var month = (1+date.getMonth());
  month = month >= 10 ? month: '0' + month;
  var day = date.getDate();
  day = day >= 10 ? day : '0' + day;
  return year + '-' + month + '-' + day; 
}

var date = dateFormat(new Date());
// console.log(date);

router.get('/', function(req, res){
  model.query(`SELECT * FROM community WHERE star >= 4`, (err, rows) => {
    const today = new Date('yyyy-mm-dd');
    console.log(today);
    model.query(`SELECT * FROM board WHERE startDate <= "${date}" and endDate >= "${date}"`, (err, rows2) => {
      console.log(rows);
      if(err) throw err;
      if (req.user == undefined) {
        res.render('home/welcome', {logged: false, rows:rows, rows2: rows2});
      }
      else {
        res.render('home/welcome', {logged: true, user: req.user, rows:rows, rows2: rows2});
      }
    })
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