const model = require('../../config/database');

// index
exports.index = (req, res) => {
    model.query(`SELECT * FROM community`, (err, rows) => {
        if(err) throw err;
        console.log(rows);
        res.render('community/index', {rows : rows});
    })
}

// new
exports.new = (req, res) => {
    if (req.user == undefined) {
        res.render('login/login');
    }
    else{
        res.render('community/new', { user: req.user});
    }
}

// create
exports.create = (req, res) => {
    var title = req.body.title;
    var content = req.body.content;
    var username = req.body.username;
    var firstKindU = req.body.firstKindU;
    var secondKindU  = req.body.secondKindU;
    var investedTime = req.body.investedTime;
    var star = req.body.star;
    model.query(`INSERT INTO community(title, body, username, firstKindU, secondKindU, investedTime, star) VALUES ("${title}", "${content}", "${username}", "${firstKindU}", "${secondKindU}", "${investedTime}", "${star}")`, (err, results) => {
        if(err) throw err;
        res.redirect('/community');
    });
}

// show
exports.show = (req, res) => {
    model.query(`SELECT * FROM community where id = ?`, [req.params.id], (err, rows) => {
        if(err) throw err;
        // 로그인 안된 상태
        if(req.user == undefined) {
            res.render('community/show', {rows : rows[0], logged: false});
        }
        // 로그인 된 상태
        else{
            res.render('community/show', {rows : rows[0], logged: true, user : req.user});
        }
    })
}

// edit
exports.edit = (req, res) => {
    model.query(`SELECT * FROM community where id = ?`, [req.params.id], (err, rows) => {
        if(err) throw err;
        res.render('community/edit', {result : rows[0]});
    })
}

// update
exports.update = (req, res) => {
    var id = req.body.id;
    var title = req.body.title;
    var content = req.body.content;
    var firstKindU = req.body.firstKindU;
    var secondKindU  = req.body.secondKindU;
    var investedTime = req.body.investedTime;
    var star = req.body.star;
    model.query(`UPDATE community SET title = "${title}", body = "${content}", firstKindU="${firstKindU}", secondKindU="${secondKindU}", investedTime="${investedTime}", star="${star}" where id = ${id}`, (err, rows) => {
        if(err) throw err;
        console.log(rows);
        res.redirect(`/community/show/${id}`);
    });
}

// delete
exports.delete = (req, res) => {
    var id = req.params.id;
    model.query(`DELETE FROM community WHERE id = ${id}`, (err, rows) => {
        if(err) throw err;
        res.redirect('/community');
    });
}