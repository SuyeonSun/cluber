// routes/test.js

const express = require('express');
const router = express.Router();

const Test = require('../controllers/test/Test');
router.get('/', Test.index);
router.post('/create', Test.create);
router.get('/result', Test.result);

module.exports = router;