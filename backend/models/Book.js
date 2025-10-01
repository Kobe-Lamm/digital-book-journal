const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: String,
    author: String, 
    publicationDate: Date,
    description: String,
})