// routes/posts.js

const express = require('express');
const router = express.Router();

const multer = require('multer'); // 파일 업로드
const upload = multer({dest: 'uploads/', limits : {filteSize : 5 * 1024 * 1024}}); // 파일 업로드

const Posts = require('../controllers/posts/Posts');
router.get('/', Posts.index);
router.get('/new', Posts.new);
// router.post('/create', Posts.create);
router.post('/create', upload.single('photo'), Posts.create);
router.get('/show/:id', Posts.show);
router.get('/edit/:id', Posts.edit);
// router.post('/update', Posts.update);
router.post('/update', upload.single('photo'), Posts.update);
router.get('/delete/:id', Posts.delete);

// comment


module.exports = router;