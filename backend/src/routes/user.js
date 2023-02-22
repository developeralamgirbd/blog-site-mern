const express = require('express');
const router = express.Router();

const {register, login, profile, profileUpdate, passwordUpdate} = require('../controllers/userController');
const {AuthVerifyMiddleware} = require("../middleware/AuthVerifyMiddleware");


router.post('/register', register);

router.post('/login', login);

router.get('/users', AuthVerifyMiddleware, profile);

router.put('/users', AuthVerifyMiddleware, profileUpdate);

router.patch('/users', AuthVerifyMiddleware, passwordUpdate);

module.exports = router;