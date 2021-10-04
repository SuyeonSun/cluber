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
    res.render('posts/new');
}

// create
exports.create = (req, res) => {
    var title = req.body.title;
    var content = req.body.content;
    model.query(`INSERT INTO board(title, body) VALUES ("${title}", "${content}")`, (err, results) => {
        if(err) throw err;
        res.redirect('/posts');
    });
}

// show
exports.show = (req, res) => {
    model.query(`SELECT * FROM board where id = ?`, [req.params.id], (err, rows) => {
        if(err) throw err;
        res.render('posts/show', {rows : rows[0]});
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
exports.update = (req, res) => {
    var id = req.body.id;
    var title = req.body.title;
    var content = req.body.content;
    model.query(`UPDATE board SET title = "${title}", body = "${content}" where id = ?`, [id], (err, rows) => {
        if(err) throw err;
        res.redirect(`/posts/show/${id}`);
    });
}

// delete
exports.delete = (req, res) => {
    var id = req.params.id;
    model.query(`DELETE FROM board WHERE id = ?`, [id], (err, rows) => {
        if(err) throw err;
        res.redirect('/posts');
    });
}