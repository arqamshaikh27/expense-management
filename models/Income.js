const mongoose = require('mongoose');

//create the income schema
const incomeSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        }
    },
    {
        versionKey: false,
    }
);

// create the model
const Income = mongoose.model("income" , incomeSchema);

module.exports = Income;