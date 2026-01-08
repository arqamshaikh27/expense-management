require('dotenv').config();
const express = require('express');
const { userRegister, allUsers, userLogin } = require('../controllers/userController');
const router = express.Router();

// endpoints
const USER_REGISTER = process.env.USER_REGISTER || '/api/user/register';
const USER_LOGIN = '/api/user/login';
const USERS = process.env.USERS || '/api/user';

// user register
router.post(USER_REGISTER , userRegister);
// user login
router.post(USER_LOGIN , userLogin);
// get all users(only for admin & testing)
router.get(USERS , allUsers);

module.exports = router;