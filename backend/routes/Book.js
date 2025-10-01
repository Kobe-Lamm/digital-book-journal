const {Router} = require("express");
const bookRouter = Router();
const {fetchBookId} = require('../utils/fetchBook')

// Defining routes:
// Get routes:
bookRouter.get("/:bookId", async (req, res)=>{
    try {
        const {bookId} = req.params;
        const bookData = await fetchBookId(bookId);
        if (!bookData) {
            return res.status(500).json({msg:"Error! Can't find book..."})
        }
        res.json(bookData);
    } 
    catch (err) {
        console.error(err)
    }
})

module.exports = bookRouter