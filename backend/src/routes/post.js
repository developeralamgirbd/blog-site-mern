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
router.get('/posts/search/:keyword/:page', searchPosts);
router.get('/posts/auth/c/:name', AuthVerifyMiddleware, authShowPostByCategory);
router.get('/posts/category/:name/:page', showPostByCategory);

router.get('/posts/show/:page', showAllPost);

router.get('/posts/:id', showSinglePost);
router.patch('/posts/:id', AuthVerifyMiddleware, updatePost);
router.delete('/posts/:id', AuthVerifyMiddleware, deletePost)


module.exports = router;