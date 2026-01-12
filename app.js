require('dotenv').config();
const express = require('express');
const userRouter = require('./routes/userRoute');
const expenseRouter = require('./routes/expenseRoute');
const incomeRouter = require('./routes/incomeRoute');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { default: rateLimit } = require('express-rate-limit');
const app = express();

// endpoints
const PORT = process.env.PORT || '3000';
const HOST = process.env.HOST || 'localhost';
const MONGOOSE_URL = 'mongodb://127.0.0.1:27017/expenseapp';

// db connection
mongoose.connect(MONGOOSE_URL)
.then(() => {
    console.log("Database has been connected")
})
.catch(err => console.log("There is a error" , err));

// security middleware
app.use(helmet());

//Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    message: 'To many request from this apis. Please try again later',
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);

// body middleware
app.use(express.json());

// routes
app.use(userRouter);
app.use(expenseRouter);
app.use(incomeRouter);

// global error handling middleware
app.use((err, req ,res ,next) => {
    const status = err.status || 500;
    console.error(`Error : ${err.message}`);
    
    res.status(status).json({message: err.message});
    next();
})

// server creation
app.listen(PORT , () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
});