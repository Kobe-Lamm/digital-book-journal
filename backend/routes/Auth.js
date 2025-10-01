const {Router} = require('express');
const Auth = Router();

// Authenticating users
Auth.post( "/login" ,(req, res, next)=>{
    // Getting user information from params
    // Search from database
    // Authentication
    // Returning user object and JWT token
})

// Signing up
Auth.get("/signup", (req, res)=>[
    // Getting user information from params
    // Creating a new user
    // Storing into database
])

Auth.post("/signup", (req, res, next)=>{

})
