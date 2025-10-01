
// Dependencies:
const {Router} = require('express');
const indexRouter = Router();
// Fetching function:
const { fetchBooks } = require('../utils/fetchBook');

// Defining routes:
indexRouter.post('/', async (req, res)=>{
    try {
        const {query} = req.body;
        const data = await fetchBooks (query);
        if (!data) {
            return res.status(500).json({errormsg: "Can't retrieve books..."})
        }
        res.json(data);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({error:"Can't retrieve books..."})
    } 
})

// Exporting module:
module.exports = indexRouter