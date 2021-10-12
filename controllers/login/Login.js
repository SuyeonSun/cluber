const model = require('../../config/database');

// index 
exports.index = (req, res) => {
    res.render('login/login');
}

// auth
// exports.auth = (req, res) => {
//     res.send('ok');
// }