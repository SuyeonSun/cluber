// routes/login.js

const express = require('express');
const router = express.Router();
const app = express();

//
const session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bkfd2Password = require("pbkdf2-password"); // npm install --save pbkdf2-password
var hasher = bkfd2Password();

const db = require('../config/database');

const Login = require('../controllers/login/Login');
router.get('/', Login.index);

//
router.post('/auth', passport.authenticate(
    'local',
    {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: false
    }
  )
);

    passport.serializeUser(function (user, done) { // 로그인 성공 시 콜백 함수 호출
        // console.log('[SerializeUser]', user);
        done(null, user.authId); // 접속한 사용자의 식별 값이, session store에 user.authId로 저장
      });
      
      passport.deserializeUser(function (authId, done) { // 로그인 성공한 사용자가 웹 페이지 이동할 때 마다 콜백 함수 호출
        // console.log('[DeserializeUser]', authId); // authId 인자에는 serializeUser 메소드에서 보낸 user.authId 값이 담김
        db.query(
          'SELECT * FROM users WHERE authId=?',
          [authId],
          function (err, results) {
            if (err) done(err);
            if (!results[0]) done(err);
            var user = results[0];
            done(null, user);
          });
      });
    
      passport.use(new LocalStrategy( // Local 저장 방식을 통한 인증 구현
        function (username, password, done) {
            db.query(
            'SELECT * FROM users WHERE authId=?',
            ['local:' + username],
            function (err, results) {
              if (err) return done(err); // 입력한 유저정보가 mysql 내 존재하지 않는 경우 1
              if (!results[0]) return done(err); // 입력한 유저정보가 mysql 내 존재하지 않는 경우 2
              var user = results[0]; // 적절한 유저정보가 존재하는 경우
              return hasher(
                { password: password, salt: user.salt },
                function (err, pass, salt, hash) {
                  if (hash === user.password) { // 사용자의 비밀번호가 올바른지 확인
                    // console.log('LocalStrategy', user);
                    done(null, user); // user 라는 값을 passport.serializeUser의 첫번째 인자로 전송
                  }
                  else done(null, false);
              });
          });
      }));

module.exports = router;