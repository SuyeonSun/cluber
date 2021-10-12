const model = require('../../config/database');

var bkfd2Password = require("pbkdf2-password"); // npm install --save pbkdf2-password
var hasher = bkfd2Password();

// index 
exports.index = (req, res) => {
    res.render('register/register');
}

// new 
exports.new = (req, res) => {
    hasher(
        { password: req.body.password },
        function (err, pass, salt, hash) {
          var user = {
            authId: 'local:' + req.body.username,
            username: req.body.username,
            password: hash,
            salt: salt
        };
        model.query('INSERT INTO users SET ?', user, 
            function (err, result) {
              if (err) throw err;
              res.redirect('/');
            });
        }
    );
}