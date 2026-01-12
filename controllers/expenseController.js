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

// manage expense
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

// get the expense amount
const expenseAmount = async (req , res , next) => {
    const pipeline = [
        {
            $group : {
                _id: null,
                totalAmount: { $sum: "$amount"}
            }
        }
    ];
    try
    {
        const expenseamount = await Expense.aggregate(pipeline).exec();
        if(!expenseamount)
        {
            const error = new Error("Expense Not Found");
            error.status = 400;
            throw error;
        }

        res.json(expenseamount);
    }
    catch(err)
    {
        next(err);
    }
}

// delete the expense 
const expenseDelete = async (req , res , next) => {
    try
    {
        const {id} = req.body;
        if(!id)
        {
            const error = new Error("ID is required");
            error.status = 400;
            throw error;
        }

        // delete the expense
        const deleteExpense = await Expense.findByIdAndDelete(id);
        if(!deleteExpense)
        {
            const error = new Error("Invalid ID");
            error.status = 400;
            throw error;
        }
        
        res.json("Expense Deleted")
    }
    catch(err)
    {
        next(err);
    }
}

module.exports = {addExpense , manageExpense , expenseAmount , expenseDelete};