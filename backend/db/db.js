// Setting up database: 
const mongoose = require('mongoose');
// Importing models:
const User = require('../models/User')
// Connecting to database: 
mongoose.connect("mongodb://localhost/readify");

// Queries: 
const createNewUser = async ({username, email, password}) => {
    try {
        const user = await User.create({username, email, password});
        return user;
    }
    catch (err) {
        throw err
    }
}
const findUser = async (username) => {

}
// Creating a new user: 
// Exporting: 
module.exports = {
    createNewUser
}
