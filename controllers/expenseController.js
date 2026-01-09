const Expense = require('../models/Expense');

// add the expense
const addExpense = async (req , res , next) => {
    try
    {
        const {title , amount} = req.body;
        if(!title || !amount)
        {
            const error = new Error("All fields are required");
            error.status = 400;
            throw error;
        }

        // add expense
        const expense = await Expense.create({
            title: title,
            amount: amount,
        });

        res.json(expense);
    }
    catch(err)
    {
        next(err);
    }
}

const manageExpense = async (req, res , next) => {
    try 
    {
        const allExpense = await Expense.find({});
        if(!allExpense)
        {
            const error = new Error("Expenses Not Found");
            error.status = 400;
            throw error;
        }      
        
        res.json(allExpense);
    }
    catch (err)
    {
        next(err)
    }
}

module.exports = {addExpense , manageExpense};