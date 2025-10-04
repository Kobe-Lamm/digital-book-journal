// Setting up database: 
const mongoose = require('mongoose');
// Importing models:
const User = require('../models/User')
// bcrypt hashing
const bcrypt = require('bcrypt');

// Connecting to database: 
mongoose.connect("mongodb://localhost/readify");

// Queries: 
const createNewUser = async ({ username, email, password }) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = await User.create({ username, email, password: hashedPassword });
        return user;
    }
    catch (err) {
        throw err
    }
}

const findUser = async (username) => {
    try {
        const user = await User.findOne({username});
        if (!user) {
            throw new Error("Can't find user...")
        }
        return user;
    }
    catch (err) {
        throw err
    }
}
// Creating a new user: 
// Exporting: 
module.exports = {
    createNewUser,
    findUser
}
