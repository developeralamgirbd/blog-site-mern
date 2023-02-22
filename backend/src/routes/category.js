const express = require('express');
const router = express.Router();

const {create, showCategory, updateCategory, deleteCategory} = require('../controllers/categoryController');
const {AuthVerifyMiddleware} = require("../middleware/AuthVerifyMiddleware");


router.post('/categories', AuthVerifyMiddleware, create);
router.get('/categories', AuthVerifyMiddleware, showCategory);
router.patch('/categories', AuthVerifyMiddleware, updateCategory);
router.delete('/categories', AuthVerifyMiddleware, deleteCategory);

module.exports = router;