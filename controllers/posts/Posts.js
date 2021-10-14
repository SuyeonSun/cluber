const model = require('../../config/database');

// index 
exports.index = (req, res) => {
    model.query(`SELECT * FROM board`, (err, rows) => {
        if(err) throw err;
        console.log(rows);
        res.render('posts/index', {rows : rows});
    })
}

// new
exports.new = (req, res) => {
    if (req.user == undefined) {
        res.render('login/login');
    }
    else {
        res.render('posts/new', { user: req.user});
    }
}

// create
exports.create = (req, res) => {
    var title = req.body.title;
    var content = req.body.content;
    var username = req.body.username;
    let filename = req.file.filename;
    model.query(`INSERT INTO board(title, body, username, photo_url) VALUES ("${title}", "${content}", "${username}", "${filename}")`, (err, results) => {
        if(err) throw err;
        res.redirect('/posts');
    });
}

// show
// exports.show = (req, res) => {
//     model.query(`SELECT * FROM board where id = ?`, [req.params.id], (err, rows) => {
//         if(err) throw err;
//         res.render('posts/show', {rows : rows[0]});
//     })
// }

// show
exports.show = (req, res) => {
    model.query(`SELECT * FROM board where id = ?`, [req.params.id], (err, rows) => {
        if(err) throw err;
        // 로그인 안된 상태
        if(req.user == undefined) {
            res.render('posts/show', {rows : rows[0], logged: false});
        }
        // 로그인 된 상태
        else{
            res.render('posts/show', {rows : rows[0], logged: true, user : req.user});
        }
    })
}

// edit
exports.edit = (req, res) => {
    model.query(`SELECT * FROM board where id = ?`, [req.params.id], (err, rows) => {
        if(err) throw err;
        res.render('posts/edit', {result : rows[0]});
    })
}

// update
// exports.update = (req, res) => {
//     var id = req.body.id;
//     var title = req.body.title;
//     var content = req.body.content;
//     model.query(`UPDATE board SET title = "${title}", body = "${content}" where id = ${id}`, (err, rows) => {
//         if(err) throw err;
//         res.redirect(`/posts/show/${id}`);
//     });
// }

exports.update = (req, res) => {
    var id = req.body.id;
    var title = req.body.title;
    var content = req.body.content;
    let filename = req.file.filename;
    model.query(`UPDATE board SET title = "${title}", body = "${content}", photo_url = "${filename}" where id = ${id}`, (err, rows) => {
        if(err) throw err;
        res.redirect(`/posts/show/${id}`);
    });
}

// delete
exports.delete = (req, res) => {
    var id = req.params.id;
    model.query(`DELETE FROM board WHERE id = ${id}`, (err, rows) => {
        if(err) throw err;
        res.redirect('/posts');
    });
}