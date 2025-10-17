// Importing dependencies: 
const express = require('express');
const multer = require('multer');
const UploadRouter = express.Router();
const User = require('../models/User');

// Where and how to save my files: 
const storage = multer.diskStorage({
    // Where to save the files: 
    destination: (req, file, cb) => { 
        // cb (error, path)
        cb(null, 'uploads/')
    },
    // How to save my file:
    filename: (req, file, cb) => {
        // cb(error, name)
        cb(null, Date.now() + '-' + file.originalname);
    },
})

// Creating the middleware for multer to use:
const upload = multer({storage});

// Post routes: for handling when user uploads a new file
UploadRouter.post("/:userId", upload.single('avatar'),  async (req, res)=>{
    try {
        // taking the user-id from the request parameters: 
        const userId  = req.params.userId;
        // If file path actually exists: 
        if (req.file) {
            // Changing the information in the user database:
            await User.findByIdAndUpdate(
                userId, // The user id to find
                { profile: req.file.path }, // The field to update
                { new: true }, // Creating a new user object
            );
            const updatedUser = await User.findById(userId).populate("collections")
            // Sending response back to front-end
            return res.status(200).json({ user: updatedUser });
        }
        res.status(200).json({msg: "No profile changed!"});
    }
    catch (err) {
        // Displaying the error to the console
        console.error(err);
        // Sending response status with error:
        res.status(500).json({msg:"Error changing profile"})
    }
})

// Exporting for user
module.exports = UploadRouter