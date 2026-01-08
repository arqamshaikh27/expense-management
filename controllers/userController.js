const User = require('../models/User');

// user register
const userRegister = async (req , res) => {
    const {name , email , password} = req.body;
    if(!name || !email || !password)
    {
        const error = new Error("All fields are required");
        error.status = 400;
        throw error;
    }

    // check the user exists or not
    const checkUser = await User.findOne({
        email: email, 
    });
    if(checkUser)
    {
        const error = new Error("User exists");
        error.status = 400;
        throw error;
    }

    // create the user
    const user = await User.create({
        name: name,
        email: email,
        password: password,
    });

    res.json(user);
}

// user Login
const userLogin = async (req , res) => {
    const {email , password} = req.body;
    if(!email || !password)
    {
        const error = new Error("All fields are required");
        error.status = 400;
        throw error;
    }

    // check the user exists or not
    const checkUser = await User.findOne({
        email: email,
        password: password
    });
    if(!checkUser)
    {
        const error = new Error("Incorrect Email or password");
        error.status = 400;
        throw error;
    }

    res.json("Login Sucessfully");
}

// all users
const allUsers = async (req, res) => {
    const users = await User.find({});
    res.json(users);
}

module.exports = {userRegister , userLogin , allUsers};