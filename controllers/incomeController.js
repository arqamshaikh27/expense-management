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

// get income amount
const incomeAmount = async (req , res ,next) => 
{
    const pipeline = [
        {
            $group: {
                _id: null,
                totalAmount: { $sum: "$amount"}
            }
        }
    ];
    try
    {
        const incomeamount = await Income.aggregate(pipeline).exec();
        if(!incomeamount)
        {
            const error = new Error("Income Not Found");
            error.status = 400;
            throw error;
        }
        res.json(incomeamount);
    }
    catch(err)
    {
        next(err);
    }
}

// delete the income
const incomeDelete = async (req , res , next) => {
    try
    {
        const {id} = req.body;
        if(!id)
        {
            const error = new Error("ID is required");
            error.status = 400;
            throw error;
        }
        
        // delete the income
        const deleteIncome = await Income.findByIdAndDelete(id);
        if(!deleteIncome)
        {
            const error = new Error("Income not found");
            error.status = 400;
            throw error;
        }

        res.json("Income is deleted");
    }
    catch(err)
    {
        next(err);
    }
}

module.exports = {addIncome , manageIncome , incomeAmount , incomeDelete};