// Setting up database: 
const mongoose = require('mongoose');
// Importing models:
const User = require('../models/User')
const {CollectionModel} = require('../models/Collection')
const {BookModel} = require('../models/Book')
const defaultCollectionImages = require('../uploads/image')
// bcrypt hashing
const bcrypt = require('bcrypt');

// Connecting to database: 
mongoose.connect("mongodb://localhost/readify");

// Updating all existing users:
User.updateMany(
    {collections: {$exists: false}},
    {$set: {collections: []}}
)

// Queries: 
// Creating a new user:
const createNewUser = async ({ username, email, password, collections }) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = await User.create({ username, email, password: hashedPassword, collections: collections });
        return user;
    }
    catch (err) {
        throw err
    }
}
// Finding an existing user:
const findUser = async (username) => {
    try {
        const user = await User.findOne({username});
        if (!user) {
            throw new Error("Can't find user...")
        }
        await user.populate("collections");
        return user;
    }
    catch (err) {
        throw err
    }
}
// Creating a new collection:
const createNewCollection = async ({title, author, books = []}) => {
    try {
        const image = defaultCollectionImages[0];
        // Creating a new collection
        const newCollection = await CollectionModel.create({
            title, 
            author, 
            books,
            image
        });
        // If it fails to create a new book
        if (!newCollection) {
            throw new Error('Error creating this collection...');
        }
        // If success, return the book
        return newCollection;
    }
    catch (err) {
        console.error(err)
        throw err;
    }
}
// Finding an existing collection:
 const findCollection = async (collectionId) => {
    try {
        const foundCollection = await CollectionModel.findById(collectionId);
        if (!foundCollection) {
            throw new Error ("Error collection...")
        }
        return foundCollection;
    }
    catch (err) {
        console.error(err)
        throw err;
    }
 }
// Updating an existing collection:
// Add new book to existing collection:
// Deleting an existing colletion: 

// Creating a new book:
const createNewBook = async ({googleId, title, author, publicationDate, description}) => {
    try {
        const newBook = await BookModel.create({
            googleId, 
            title, 
            author, 
            publicationDate,
            description
        })
        if (!newBook) {
            throw new Error("Error creating book...")
        }
        return newBook;
    }
    catch (err) {
        console.error(err)
        throw err
    }
}
// Updating an existing book:
// Finding an existing book:
const findBook = async (bookId) => {
    try {
        const foundBook = await BookModel.findOne({ googleId: bookId });
        if (!foundBook) {
            return null
        }
        return foundBook;
    }
    catch (err) {
        console.error(err);
    }
}
// Deleting an existing book: 


// Exporting: 
module.exports = {
    createNewUser,
    findUser,
    createNewCollection,
    findCollection,
    createNewBook,
    findBook,
}
