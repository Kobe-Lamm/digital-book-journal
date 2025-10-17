// Setting server up:
require('dotenv').config();
const express = require('express');
const app = express();
// Dependencies: 
const cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose');
const port = process.env.PORT 
const cookieParser = require('cookie-parser');
// Importing routers: 
const indexRouter = require('./routes/Index');
const bookRouter = require('./routes/Book');
const {Login, Signup, Logout, AuthRouter, Refresh} = require('./routes/Auth')
const {UserRouter, DashboardRouter} = require('./routes/User')
const CollectionRouter = require('./routes/Collection')
const UploadRouter  = require('./routes/Upload');

// Cookie parser:
app.use( cookieParser() );
// Cross Site
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["POST", "GET", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
// Parsing JSON
app.use(express.json());
// Static image websites:
app.use("/uploads",express.static( __dirname + "/uploads")) // 

// Setting up routes:
app.use('/', indexRouter);
app.use('/user', UserRouter);
app.use('/book', bookRouter);
app.use('/signup', Signup);
app.use('/login', Login);
app.use('/dashboard', DashboardRouter);
app.use('/logout', Logout);
app.use('/collection', CollectionRouter);
app.use('/verify', AuthRouter);
app.use('/refresh', Refresh);
app.use('/upload', UploadRouter);

// Listening for port requests
app.listen(port, ()=>{
    console.log(`Server is running!`)
})