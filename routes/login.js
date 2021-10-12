// routes/login.js

const express = require('express');
const router = express.Router();
const passport = require('passport'); // 

const Login = require('../controllers/login/Login');
router.get('/', Login.index);
router.post('/login', Login.login);

module.exports = router;