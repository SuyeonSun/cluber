var express = require('express');
var app = express();

const session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
const db = require('./config/database');// 
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

app.use(session({
    secret: '1234DSFs@adf1234!@#$asd',
    resave: false,
    saveUninitialized: false,
  }));
app.use(passport.initialize()); // passport 사용 하도록 세팅
app.use(passport.session()); // passport 사용 시 session을 활용

var bkfd2Password = require("pbkdf2-password"); // npm install --save pbkdf2-password
var hasher = bkfd2Password();

app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

var methodOverride = require('method-override');
app.use(methodOverride('_method'));

// port setting
app.listen(3000);

// routes
app.use('/', require('./routes/home'));
app.use('/posts', require('./routes/posts'));
app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));

