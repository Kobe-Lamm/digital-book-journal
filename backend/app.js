// Setting server up:
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT 

// Importing routers: 
const indexRouter = require('./routes/Index');
const bookRouter = require('./routes/Book');

// Setting up middleware:
app.use(express.json());
app.use(cors());

// Setting up routes:
app.use('/', indexRouter)
app.use('/book', bookRouter);

// Listening for port requests
app.listen(port, ()=>{
    console.log(`Server is running!`)
})