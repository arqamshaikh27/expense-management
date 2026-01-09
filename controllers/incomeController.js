const Income = require('../models/Income');

// add income
const addIncome = async (req , res ,next) => {
    try 
    {
        const {title , amount} = req.body;
        if(!title || !amount)
        {
            const error = new Error("All fields are required");
            error.status = 400;
            throw error;
        }

        // add income
        const income = await Income.create({
            title: title,
            amount: amount
        });

        res.json(income);
    } 
    catch(err)
    {
        next(err);    
    }
}

// manage income
const manageIncome = async (req , res , next) => {
    try
    {
        const allIncome = await Income.find({});
        if(!allIncome)
        {
            const error = new Error("Income Not Found");
            error.status = 400;
            throw error;
        }

        res.json(allIncome);
    }
    catch(err)
    {
        next(err);
    }
}

module.exports = {addIncome , manageIncome};