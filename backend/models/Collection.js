// Dependencies: 
const mongoose = require('mongoose');
const { BookSchema } = require('./Book')

// Creating the schema:
const CollectionSchema = new mongoose.Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    date: {type: Date, default: Date.now},
    description: {type: String, default: "Describe your collection!"},
    image: {type: String, default: ""},
    books: [BookSchema],
});

// Creating the model:
const CollectionModel = mongoose.model("Collection", CollectionSchema)

// Exporting
module.exports = {
    CollectionSchema,
    CollectionModel
}