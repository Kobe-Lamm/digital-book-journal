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
const {Login, Signup, Logout} = require('./routes/Auth')
const UserRouter = require('./routes/User')
const CollectionRouter = require('./routes/Collection')

// Cross Site:
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    method: ["POST", "GET", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
// Parsing JSON
app.use(express.json());
// Static image websites:
app.use("/uploads",express.static( __dirname + "/uploads"))


// Setting up routes:
app.use('/', indexRouter)
app.use('/book', bookRouter);
app.use('/signup', Signup);
app.use('/login', Login);
app.use('/dashboard', UserRouter);
app.use('/logout', Logout);
app.use('/collection', CollectionRouter);

// Listening for port requests
app.listen(port, ()=>{
    console.log(`Server is running!`)
})