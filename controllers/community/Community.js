const model = require('../../config/database');

// index
exports.index = (req, res) => {
    if (req.user == undefined) {
        model.query(`SELECT * FROM community`, (err, rows) => {
            if(err) throw err;
            console.log(rows);
            res.render('community/index', {rows : rows, logged: false});
        })
    }
    else{
        model.query(`SELECT * FROM community`, (err, rows) => {
            if(err) throw err;
            console.log(rows);
            res.render('community/index', {rows : rows, logged: true, user: req.user});
        })
    }
}

// new
exports.new = (req, res) => {
    if (req.user == undefined) {
        res.render('login/login', {logged: false});
    }
    else{
        res.render('community/new', {logged: true, user: req.user});
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
        // 로그인 안된 상태
        if(req.user == undefined) {
            res.render('community/show', {rows : rows[0], logged: false});
        }
        // 로그인 된 상태
        else{
            res.render('community/show', {rows : rows[0], logged: true, user: req.user});
        }
    })
}

// edit
exports.edit = (req, res) => {
    if (req.user == undefined) {
        res.render('community/edit', {logged: false});
    }
    else{
        model.query(`SELECT * FROM community where id = ?`, [req.params.id], (err, rows) => {
            if(err) throw err;
            res.render('community/edit', {result : rows[0], logged: true, user : req.user});
        })
    }
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

// comment
exports.add = (req, res) => {
    var username = req.body.username;
    var text = req.body.text;
    // var id = req.body.id;
    // console.log(id);

    model.query(`INSERT INTO comment SET ?`,{username, text}, (err,rows)=>{
            if(err) throw err;
            res.json({success : 1, message: 'Success Create'});
    }) 
}