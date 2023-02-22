const express = require('express');
const router = express.Router();

const {create, showAllPost, updatePost, showPostByCategory, showPostByStatus, searchPost, deletePost} = require('../controllers/postController');
const {AuthVerifyMiddleware} = require("../middleware/AuthVerifyMiddleware");


router.post('/posts', AuthVerifyMiddleware, create);
router.get('/posts', AuthVerifyMiddleware, showAllPost);
router.get('/posts/status/:status', AuthVerifyMiddleware, showPostByStatus);
router.get('/posts/search/:search', AuthVerifyMiddleware, searchPost);
router.get('/posts/category/:name', AuthVerifyMiddleware, showPostByCategory);
router.put('/posts', AuthVerifyMiddleware, updatePost);
router.delete('/posts', AuthVerifyMiddleware, deletePost)


module.exports = router;