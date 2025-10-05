require('dotenv').config();
const {Router} = require('express');
const Login = Router();
const Signup = Router();
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET

const bcrypt = require('bcrypt');


// Importing user model:
const { createNewUser, findUser } = require('../db/db');

// Signing up:
Signup.post('/', async (req, res)=> {
    try {
        // Getting user-input: 
        const { username, email, password } = req.body;
        // Creating a new user:
        const newUser = await createNewUser({username, email, password});
        if (!newUser) {
            res.status(501).send({msg: "Error! Can't create user..."})
        }
        res.status(201).json({msg: "Successfully created user!", user: newUser});
    }
    catch (err) {
        throw err;
    }
});

// Logging in: 
Login.post("/", async (req, res) => {
    try {
        // Destructuring:
        const {username, password} = req.body;
        const user = await findUser(username);
        if (!user) {throw new Error("Can't find user...")}
        
        // Check user password - Authentication
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {return res.status(400).json({msg: "Invalid password"})};
        
        // Creating the token - Authorization: 
        const token = jwt.sign(
            {id: user._id, username: user.username},
            secret,
            {expiresIn: "1h"}
        )
        
        // Storing cookie into httpCookie:
        res.cookie('token', token, {
            httpOnly: true, // JS cannot access
            secure: true, // Only covers HTTPS
            sameSite: 'Strict' // CSRF protection
        })

        // Sending token to front-end:
        res.json( { id: user._id, username: user.username, email: user.email } )
    }
    catch (err) {
        console.error(err);
        res.status(500).json({msg: "Error!"})
    }
})

module.exports = {Login, Signup}