
const {Router} = require('express');
const CollectionRouter = Router();
const {findCollection, findBook, createNewBook, createNewCollection} = require('../db/db');
const { CollectionModel, CollectionSchema } = require('../models/Collection');
const {BookModel, BookSchema} = require('../models/Book');
const {fetchBookId} = require('../utils/fetchBook');
const User = require('../models/User');

// Post: 
CollectionRouter.post("/:colId", async (req, res) => {
    try {
        // Destructuring the value from the body: 
        const { bookId } = req.body;      
        const colId = req.params.colId;      
        // Finding the appropriate collection:
        const correctCol = await findCollection(colId); 
        // Finding the book:
        let book = await findBook(bookId); 
        if (book === null) { 
            // Getting book object: 
            const bookObj = await fetchBookId(bookId);
            // Creating new object: 
            book = await createNewBook({
                googleId: bookObj.id, // ID 
                title: bookObj.volumeInfo.title, // Title 
                author: bookObj.volumeInfo.authors, // Authors 
                publicationDate: bookObj.volumeInfo.publishedDate, // Published Dates 
                description: bookObj.volumeInfo.description, // Descriptions 
            })
        }
        // Book ID: 
        if (!book._id) {
            console.error("Can't find book");
            return res.status(400).json({msg: "Invalid book object"});
        }
        // Adding the book to the collection:  
        await CollectionModel.updateOne(
            {_id: correctCol._id},
            {$addToSet: {books: book._id}}, 
        );
        // Sending response back to frontend:      
        res.status(201).json({ msg: "Successfully added book to collection!" })
    }
    // Catching error:   
    catch (err) {
        res.status(500).json(err);
    }
})

// Get data from route:   
CollectionRouter.get("/:colId", async (req, res)=>{
    try {
        // Taking Id from request:   
        const  { colId } = req.params;
        // Find the collectionId from the database:  
        let col = await findCollection(colId);
        // Converting the ids into an actual book:  
        const populateBook = await col.populate("books");
        // Assigning it to books: 
        const books = populateBook.books || [];
        // Sending response back to front-end
        res.status(200).json({ books, col });
    }
    catch (err) {
        res.status(500).json(err) // Sending error: 
    }
})

CollectionRouter.post("/:colId/edit", async (req, res)=>{
    try {
        // Getting the new description and username from the request:
        const { input } = req.body;
        const { colId } = req.params;
        console.log(colId);
        console.log(input);
        // Finding the collection
       const col = await CollectionModel.findByIdAndUpdate(
            colId, 
            {
                $set: {
                    title: input.title,
                    description: input.description
                }
            },
            {new: true}
        )
        // Sending response status:
        res.status(201).json({collection: col , msg: "Successfully edited collection!"})
    }
    catch (err) {
        console.error(err);
        res.status(501).json({msg: "error!"})
    }
})

// Creating a new router
CollectionRouter.post("/", async (req, res)=>{
    try {
        // Getting the user input
        const { title, author, description } = req.body;
        // Creating a new collection
        const newCollection = await createNewCollection({
            title: title, 
            author: author,
            description: description,
        })
        // Finding the author: 
        await User.findByIdAndUpdate(author, {
            $push: {collections: newCollection._id},
        })
        // Sending response status to front-end: 
        res.status(200).json({collection: newCollection, msg: "Successfully created new collection!"});
    }
    catch (err) {
        res.status(500).json({msg: "Error creating new collection"})
    }
})

CollectionRouter.delete("/:colId/book/:bookId", async (req, res)=>{
    try {
        const {colId, bookId} = req.params;
        // Finding the correct book from the model: 
        const book = await BookModel.findOne({ googleId: bookId });
        console.log(book);
        // If book not found:
        if (!book) {
            res.status(404).json({ msg: "Error! Can't find book" });
        }
        // Finding the collection and updating it
        await CollectionModel.findByIdAndUpdate(
            colId, 
            { $pull: { books: book._id }}
        )
        // Sending the response status back to frontend
        res.status(200).json({ msg: "Successfully deleted book" })
    }
    catch (err) {
        console.error(err);
        res.status(500).json( {msg: "Error deleting book!"} );
    }
})

CollectionRouter.delete("/:colId/delete", async (req, res)=>{
    try {
         const {colId} = req.params;
        // Delete collection database:
        // Finding the correct collection from the database
        const col = await CollectionModel.findByIdAndDelete(colId);
        if (!col) {
            return res.status(404).json({msg: "Can't find collection"})
        }
        await User.findByIdAndUpdate( 
            col.author,
            { $pull: { collections: col._id } }
        )
        res.status(200).json({msg: "Successfully deleted collection!"});
    }
    catch (err) {
        console.error(err)
        res.status(500).json({ msg: "Error deleting collection" })
    }
})
// Exporting:
module.exports = CollectionRouter