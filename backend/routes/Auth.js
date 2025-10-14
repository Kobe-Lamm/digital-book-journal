require('dotenv').config();
const {Router} = require('express');
const Login = Router();
const Signup = Router();
const Logout = Router();
const AuthRouter = Router();
const Refresh = Router();
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET
const refreshSecret = process.env.REFRESH_SECRET
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
        // Creating an array of collection Id's to store
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
        const payload = { id: user._id, username: user.username};
        // Short-term access token:
        const accessToken = jwt.sign(payload, secret, {expiresIn: "7d"})
        // Long-term access token used to get new access tokens: 
        const refreshToken = jwt.sign(payload, refreshSecret, {expiresIn: "15m"});
        
        // Storing cookie into httpCookie:
        res.cookie('accessToken', accessToken, {
            httpOnly: true, // JS cannot access
            secure: process.env.NODE_ENV === "production", // Only covers HTTPS
            sameSite: process.env.NODE_ENV === "production" ? "Strict" : "Lax", // CSRF protection
            maxAge: 15 * 60 * 1000, // 15 minutes
        })
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'Strict' : "Lax",
            maxAge:  7 * 24 * 60 * 60 * 1000, // 7 Days,

        })
        res.json(user)
    }
    catch (err) {
        console.error(err);
        res.status(500).json({msg: "Error!"})
    }
})

Refresh.post("/", async (req, res) => {
    try {
        // Taking the token from the cookie: 
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            res.status(401).json({msg: "No refresh token found!"})
        };
        const data = jwt.verify(refreshToken, refreshSecret);
        // Validating the token:
        const newAccess = jwt.sign(
            {id : data._id, username: data.username},
            secret,
            {expiresIn: "15m"},
        );
        res.cookie("accessToken", newAccess, {
            httpOnly: true,
            secure: false, 
            sameSite: "lax",
            maxAge: 15 * 60 * 1000,
        });
        return res.json({msg : "Access token refreshed"});
    }
    catch(err) {
        console.error(err);
        res.status().json({msg : "Invalid or expired token"})
    };
})

// Logging out
Logout.post("/", (req, res)=>{
    try {
        // Removing the jwt token
        res.clearCookie("accessToken", {
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

// Auth router: 
AuthRouter.get("/", async (req, res)=>{
    const token = req.cookies?.accessToken; // Accessing token from the cookie
    if (!token) {res.status(401).json({msg: "No token found"})} // Error if no token:
    try {
        const decoded = jwt.verify(token, secret);
        const user = await findUser(decoded.username);
        res.json( { user: user } );
    }
    catch (err) {
        console.error(err);
        res.status(403).json({msg: "Invalid or expired token..."})
    }
})

module.exports = {Login, Signup, Logout, AuthRouter, Refresh}