
const {Router} = require('express');
const CollectionRouter = Router();
const {findCollection, findBook, createNewBook} = require('../db/db');
const { CollectionModel, CollectionSchema } = require('../models/Collection');
const {fetchBookId} = require('../utils/fetchBook');

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
        const col = await findCollection(colId);
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

// Exporting:
module.exports = CollectionRouter