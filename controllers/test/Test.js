const model = require('../../config/database');

// index 
exports.index = (req, res) => {
    if (req.user == undefined) {
        res.render('login/login', {logged: false});
    }
    else {
        res.render('test/test', {logged: true, user: req.user});
    }
}

// result 
exports.result = (req, res) => {
    if (req.user == undefined) {
        res.render('test/result', {logged: false});
    }
    else {
        var username = req.user.username
        model.query(`SELECT * FROM users WHERE username = ?`, username, (err, rows) => {
            res.render('test/result', {logged: true, user: req.user, rows:rows});
        })
    }
}

// create
exports.create = (req, res) => {
    var Q1 = req.body.Q1;
    var Q2 = req.body.Q2;
    var Q3 = req.body.Q3;
    var Q4 = req.body.Q4;
    var mbti = Q1 + Q2 + Q3 + Q4;
    var category = req.body.category;

    model.query(`SELECT * FROM test WHERE 엠비티 = "${mbti}" AND 카테고리 = "${category}"`, (err, result) => {
        if(err) throw err;
        // console.log(mbti);
        // console.log(category);
        // console.log(result[0].동아리명);
        var club_name = result[0].동아리명
        var username = req.user.username;
        console.log(club_name);
        model.query(`UPDATE users set test_result = "${club_name}" WHERE username= ?`, username, (err, rows) => {
            if(err) throw err;
            console.log(rows);
            res.send("<script>alert(`테스트 결과를 확인하세요!`);location.href='/test/result';</script>");
        });
    });
}