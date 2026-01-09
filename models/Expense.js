const mongoose = require('mongoose');

// creating the expense schema
const expenseSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        }
    },
    {
        versionKey: false,
    },
    {
        timestamps: true,
    },
);

// expense model 
const Expense = mongoose.model("expense", expenseSchema);

module.exports = Expense;