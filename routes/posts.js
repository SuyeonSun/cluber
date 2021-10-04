// routes/posts.js

const express = require('express');
const router = express.Router();

const Posts = require('../controllers/posts/Posts');
router.get('/', Posts.index);
router.get('/new', Posts.new);
router.post('/create', Posts.create);
router.get('/show/:id', Posts.show);
router.get('/edit/:id', Posts.edit);
router.post('/update', Posts.update);
router.get('/delete/:id', Posts.delete);

module.exports = router;