// routes/community.js

const express = require('express');
const router = express.Router();

const Community = require('../controllers/community/Community');
router.get('/', Community.index);
router.get('/new', Community.new);
router.post('/create', Community.create);
router.get('/show/:id', Community.show);
router.get('/edit/:id', Community.edit);
router.post('/update', Community.update);
router.get('/delete/:id', Community.delete);

// comment
router.post('/add', Community.add);
router.get('/minus/:com_id', Community.minus);

module.exports = router;