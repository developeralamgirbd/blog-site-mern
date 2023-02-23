const express = require('express');
const router = express.Router();

const {create, showAllPost, updatePost, showPostByCategory, showPostByStatus, authSearchPosts, deletePost, searchPosts,
    showSinglePost, authShowPostByCategory
} = require('../controllers/postController');
const {AuthVerifyMiddleware} = require("../middleware/AuthVerifyMiddleware");


router.post('/posts', AuthVerifyMiddleware, create);
router.get('/posts/auth/s/:keyword', AuthVerifyMiddleware, authSearchPosts);
router.get('/posts/s/:keyword', searchPosts);
router.get('/posts/auth/c/:name', AuthVerifyMiddleware, authShowPostByCategory);
router.get('/posts/c/:name', showPostByCategory);
router.get('/posts/:id', showSinglePost);
router.patch('/posts/:id', AuthVerifyMiddleware, updatePost);
router.delete('/posts/:id', AuthVerifyMiddleware, deletePost)
router.get('/posts', AuthVerifyMiddleware, showAllPost);


module.exports = router;