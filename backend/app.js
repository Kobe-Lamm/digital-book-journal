// Setting server up:
require('dotenv').config();
const express = require('express');
const app = express();
// Dependencies: 
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT 

// Importing routers: 
const indexRouter = require('./routes/Index');
const bookRouter = require('./routes/Book');
const {Login, Signup} = require('./routes/Auth')
const UserRouter = require('./routes/User')

// Setting up middleware:
// Parsing JSON
app.use(express.json());

// Cross Site:
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

// Setting up routes:
app.use('/', indexRouter)
app.use('/book', bookRouter);
app.use('/signup', Signup);
app.use('/login', Login);
app.use('/dashboard', UserRouter);

// Listening for port requests
app.listen(port, ()=>{
    console.log(`Server is running!`)
})