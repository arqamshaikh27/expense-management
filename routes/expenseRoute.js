require('dotenv').config();
const express = require('express');
const { addExpense, manageExpense, expenseAmount, expenseDelete } = require('../controllers/expenseController');
const router = express.Router();

// endpoints
const ADD_EXPENSE = process.env.ADD_EXPENSE || '/expense/add';
const MANAGE_EXPENSE = process.env.MANAGE_EXPENSE || '/expense/manage';

// add expense
router.post(ADD_EXPENSE , addExpense);
// show all the expenses
router.get(MANAGE_EXPENSE , manageExpense);
// get the expense amount
router.get('/api/user/expense' , expenseAmount);
// delete expense
router.delete('/api/user/expense/delete' , expenseDelete);

module.exports = router;