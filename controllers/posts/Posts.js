const model = require('../../config/database');

// index 
exports.index = (req, res) => {
    if (req.user == undefined) {
        model.query(`SELECT * FROM board`, (err, rows) => {
            if(err) throw err;
            console.log(rows);
            res.render('posts/index', {logged: false, rows : rows});
        })
    }
    else{
        model.query(`SELECT * FROM board`, (err, rows) => {
            if(err) throw err;
            console.log(rows);
            res.render('posts/index', {logged: true, user: req.user, rows : rows});
        })
    }
}

// new
exports.new = (req, res) => {
    if (req.user == undefined) {
        res.render('login/login', {logged: false});
    }
    else {
        res.render('posts/new', {logged: true, user: req.user});
    }
}

// create
exports.create = (req, res) => {
    var title = req.body.title;
    var content = req.body.content;
    var username = req.body.username;
    let filename = req.file.filename;
    var firstKindU = req.body.firstKindU;
    var secondKindU  = req.body.secondKindU;
    var startDate  = req.body.startDate;
    var endDate  = req.body.endDate;
    model.query(`INSERT INTO board(title, body, username, photo_url, firstKindU, secondKindU, startDate, endDate) VALUES ("${title}", "${content}", "${username}", "${filename}", "${firstKindU}", "${secondKindU}", "${startDate}", "${endDate}")`, (err, results) => {
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
// exports.show = (req, res) => {
//     model.query(`SELECT * FROM board where id = ?`, [req.params.id], (err, rows) => {
//         if(err) throw err;
//         // 로그인 안된 상태
//         if(req.user == undefined) {
//             res.render('posts/show', {rows : rows[0], logged: false});
//         }
//         // 로그인 된 상태
//         else{
//             res.render('posts/show', {rows : rows[0], logged: true, user : req.user});
//         }
//     })
// }
exports.show = (req, res) => {
    model.query(`SELECT * FROM board where id = ?`, [req.params.id], (err, rows) => {
        model.query(`SELECT * FROM boardcomment where post_id=?`, [req.params.id], (err, comments) => {
            if (err) throw err;
            // 로그인 안된 상태
            if(req.user == undefined) {
                res.render('posts/show', {rows : rows[0], comments: comments, logged: false});
            }
            // 로그인 된 상태
            else{
                res.render('posts/show', {rows : rows[0], comments: comments, logged: true, user: req.user});
            }
        })
    })
}

// edit
exports.edit = (req, res) => {
    if (req.user == undefined) {
        res.render('posts/edit', {logged: false});
    }
    else{
        model.query(`SELECT * FROM board where id = ?`, [req.params.id], (err, rows) => {
            if(err) throw err;
            res.render('posts/edit', {logged: true, user : req.user, result : rows[0]});
        })
    }
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
    var firstKindU = req.body.firstKindU;
    var secondKindU  = req.body.secondKindU;
    var startDate  = req.body.startDate;
    var endDate  = req.body.endDate;
    model.query(`UPDATE board SET title = "${title}", body = "${content}", photo_url = "${filename}", firstKindU="${firstKindU}", secondKindU="${secondKindU}", startDate="${startDate}", endDate="${endDate}" where id = ${id}`, (err, rows) => {
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

// comment add
exports.add = (req, res) => {
    var username = req.body.username;
    var text = req.body.text;
    var post_id = req.body.post_id;

    model.query(`INSERT INTO boardcomment SET ?`,{username, text, post_id}, (err,rows)=>{
            if(err) throw err;
            res.json({success : 1, message: 'Success Create'});
    }) 
}

// comment delete
exports.minus = (req, res) => {
    model.query(`SELECT * FROM board where id = ?`, [req.params.id], (err, rows) => {
        model.query(`DELETE FROM boardcomment where comment_id=?`, [req.params.com_id], (err, comments) => {
            res.redirect(`/posts`);
        })
    })
}
