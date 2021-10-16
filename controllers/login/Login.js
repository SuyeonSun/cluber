// index 
exports.index = (req, res) => {
    if (req.user == undefined) {
        res.render('login/login', {logged: false});
    }
    else {
        res.render('login/login', {logged: true, user: req.user});
      }
}