const express = require('express');
const router = express.Router();

const {register, login, profile, profileUpdate, passwordUpdate, verifyOTP, sendOTP, resetPassword} = require('../controllers/userController');
const {AuthVerifyMiddleware} = require("../middleware/AuthVerifyMiddleware");


router.post('/register', register);

router.post('/login', login);
router.get('/users/:email/:otp', verifyOTP);
router.get('/users/:email', sendOTP);
router.patch('/users/:email/:otp', resetPassword);

router.get('/users', AuthVerifyMiddleware, profile);

router.patch('/users/p', AuthVerifyMiddleware, profileUpdate);
router.patch('/users', AuthVerifyMiddleware, passwordUpdate);


module.exports = router;