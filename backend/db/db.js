// Setting up database: 
const mongoose = require('mongoose');

// Connecting to database: 
mongoose.connect("mongodb://localhost/readify", 
    ()=>{
        console.log("Connected to database.")
    },
    e => console.error(e)
);

// Functions:
// Inserting
// Updating
