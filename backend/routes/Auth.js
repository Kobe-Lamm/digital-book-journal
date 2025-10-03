const {Router} = require('express');
const Login = Router();
const Signup = Router();
const mongoose = require('mongoose');

// Importing user model:
const createNewUser = require('../db/db')

// Signing up:
Signup.post('/', async (req, res)=> {
    try {
        // Getting user-input: 
        const {username, email, password, checkPassword} = req.body;
        // Creating a new user:
        const newUser = await createNewUser(username, email, password);
        res.status(501).send({msg: "Successfully created user!", user: newUser});
    }
    catch (err) {
        throw err;
    }
});

// Logging in: 
Login.post("/", async (req, res) => {
    try {
        // Destructuring
        const {username, email, password} = req.body;
        // Searching in database for result
    }
    catch (err) {
        throw err
    }
})

module.exports = {Login, Signup}