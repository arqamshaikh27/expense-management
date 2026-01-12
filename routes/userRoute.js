require('dotenv').config();
const express = require('express');
const { userRegister, allUsers, userLogin } = require('../controllers/userController');
const {validationResult , body} = require('express-validator');
const router = express.Router();

// endpoints
const USER_REGISTER = process.env.USER_REGISTER || '/register';
const USER_LOGIN = process.env.USER_LOGIN || '/login';
const USERS = process.env.USERS || '/user';

// handle validation errors
const handleValidationError = (req , res ,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({
            success: false,
            message: 'Validation Error',
            errors: errors.array()
        });
    }
    next();
}

//user register validation and sanitization rules
const userRegisterValidation = [
    body('name')
        .trim()
        .isLength({min: 3 , max: 100}).withMessage('Name must be between 3 and 100 characters'),
    body('email')
        .isEmail()
        .withMessage('Invalid email address'),
    body('password')
        .isLength({min: 8})
        .withMessage('Password must be 8 character long')
];

// login validation
const loginValidation =[
    body('email')
        .notEmpty()
        .withMessage("Email is required"),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
];


// user register
router.post(USER_REGISTER , userRegisterValidation , handleValidationError , userRegister);
// user login
router.post(USER_LOGIN , loginValidation , handleValidationError  , userLogin);
// get all users(only for admin & testing)
router.get(USERS , allUsers);

module.exports = router;