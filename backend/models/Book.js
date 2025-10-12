const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    googleId: {type: String, required: true},
    title: {type: String, default: "Unknown" ,required: true},
    author: [String],
    publicationDate: {type: String, default: "Unknown"},
    description: {type: String, default: "Write a description for your collection..."}
})

const BookModel = mongoose.model("Book", BookSchema)

module.exports = {
    BookSchema,
    BookModel,
}