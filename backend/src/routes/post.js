const express = require('express');
const router = express.Router();

const {create, authShowAllPost, updatePost, showPostByCategory, showPostByStatus, authSearchPosts, deletePost, searchPosts,
    showSinglePost, authShowPostByCategory,
    showAllPost
} = require('../controllers/postController');
const {AuthVerifyMiddleware} = require("../middleware/AuthVerifyMiddleware");


router.get('/posts/auth', AuthVerifyMiddleware, authShowAllPost);
router.post('/posts', AuthVerifyMiddleware, create);
router.get('/posts/auth/s/:keyword', AuthVerifyMiddleware, authSearchPosts);
router.get('/posts/s/:keyword', searchPosts);
router.get('/posts/auth/c/:name', AuthVerifyMiddleware, authShowPostByCategory);
router.get('/posts/c/:name', showPostByCategory);
router.get('/posts/:id', showSinglePost);
router.patch('/posts/:id', AuthVerifyMiddleware, updatePost);
router.delete('/posts/:id', AuthVerifyMiddleware, deletePost)
router.get('/posts', showAllPost);


module.exports = router;