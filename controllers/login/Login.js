const model = require('../../config/database');

// index 
exports.index = (req, res) => {
    res.render('login/login');
}

// login
exports.login = (req, res) => {
    let name = req.body.username;
    let pwd = req.body.password;

    model.query(`SELECT * FROM users WHERE name="${name}"`, (err, results)=>{
        if (err) throw err;

        // 존재하는 email 이라면,
        if (results.length>0){
            if (results[0].password == pwd){ 
                res.send('로그인 성공');
            }
            else{
                res.send(`<script>alert('로그인 실패'); location.href="/login";</script>`);
            }
        }

        // 존재하지 않는 email 이라면,
        else{
            res.send(`<script>alert('존재하지 않는 유저네임 입니다.'); location.href="/register";</script>`);
        }
    });
}