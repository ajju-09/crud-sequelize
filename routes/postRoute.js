const express = require('express');
const auth = require('../middlewares/auth');
const { createPost, getPosts, getMyPosts } = require('../controllers/postController');


const router = express.Router();
router.post('/createpost', auth, createPost);
router.get('/getallpost', auth, getPosts);
router.get('/getpost', auth, getMyPosts);


module.exports = router;