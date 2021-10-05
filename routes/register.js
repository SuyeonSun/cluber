// routes/register.js

const express = require('express');
const router = express.Router();

const Register = require('../controllers/register/Register');
router.get('/', Register.index);
router.post('/register', Register.register);

module.exports = router;