require('dotenv').config();
const {Router} = require('express');
const Login = Router();
const Signup = Router();
const Logout = Router();
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET
// Bcrypt security
const bcrypt = require('bcrypt');


// Importing user model:
const { createNewUser, findUser, createNewCollection } = require('../db/db');

// Signing up:
Signup.post('/', async (req, res)=> {
    try {
        // Getting user-input: 
        const { input, defaultCollections } = req.body;
        // Loop to create the collection model: 
        const createdCollections = await Promise.all(
            defaultCollections.map( col => createNewCollection(col))
        )
        const collectionIds = createdCollections.map(col=>col._id);
        // Creating a new user:
        const newUser = await createNewUser({
            username: input.username, 
            email: input.email, 
            password: input.password, 
            collections: collectionIds
        });
        // If Failure:
        if (!newUser) {
            res.status(501).send({msg: "Error! Can't create user..."})
        }
        // If success:
        res.status(201).json({msg: "Successfully created user!", user: newUser});
    }
    catch (err) {
        console.error(err);
        res.status(500).json({msg: "Error creating new user... Please try again."})
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
            secure: process.env.NODE_ENV === "production", // Only covers HTTPS
            sameSite: process.env.NODE_ENV === "production" ? "Strict" : "Lax" // CSRF protection
        })

        res.json( user )
    }
    catch (err) {
        console.error(err);
        res.status(500).json({msg: "Error!"})
    }
})

// Logging out
Logout.post("/", (req, res)=>{
    try {
        // Removing the jwt token
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        })
        // Sending response: 
        res.status(201).json({msg: "Logged out successful!"})
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({msg: err})
    }
})

module.exports = {Login, Signup, Logout}