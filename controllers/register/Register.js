const model = require('../../config/database');

// index 
exports.index = (req, res) => {
    res.render('register/register');
}

// register 
exports.register = (req, res) => {
    let email = req.body.email;
    let pwd = req.body.pwd;
    let name = req.body.name;
    model.query(`SELECT * FROM users WHERE name="${name}"`, (err, results)=>{
        if (err) throw err;
        // 이미 가입된 유저라면,
        if (results.length>0){
            res.send(`<script>alert('이미 가입된 유저네임 입니다.'); location.href="/register";</script>`); // 이전 페이지로
        }
        // 입되지 않은 유저라면,
        else{
            model.query(`INSERT INTO users (email, password, name) VALUES ("${email}", ${pwd}, "${name}")`, (err, rows)=>{
                if(err) throw err;
                console.log(rows);
                res.redirect('/register');
            });
        }
    }); 
}