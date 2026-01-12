require('dotenv').config();
const express = require('express');
const { addIncome, manageIncome, incomeAmount, incomeDelete } = require('../controllers/incomeController');
const router = express.Router();

//endpoints
const ADD_INCOME = process.env.ADD_INCOME || '/income/add';
const MANAGE_INCOME = process.env.MANAGE_INCOME || '/income/manage';

// add income
router.post(ADD_INCOME , addIncome);
// show all income
router.get(MANAGE_INCOME , manageIncome);
// get the income amount
router.get('/api/user/income' , incomeAmount);
// delete income route
router.delete('/api/user/income/delete' , incomeDelete);

module.exports = router;