const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: {type: String, default: "Unknown" ,required: true},
    author: {type: String, required: true},
    publicationDate: {type: Date, default: Date.now},
    description: {type: String, default: "Write a description for your collection..."}
})

const BookModel = mongoose.model("Book", BookSchema)

module.exports = {
    BookSchema,
    BookModel,
}