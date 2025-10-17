// Importing routers: 
const {Router} = require('express');
const DashboardRouter = Router();
const UserRouter = Router();

// find user
const {findUser, findCollection} = require('../db/db');
const User = require('../models/User');

// Routers: 
// Relating to users
DashboardRouter.get('/:username', async (req, res)=>{
    try {
        // Retrieving the username:
        const {username} = req.params;
        // Searching for user: 
        const user = await findUser(username);
        // Sending user-object back to front-end
        res.json(user);
    }
    catch (err) {
       return res.status(501).json({msg: "Server error..."})
    }
})

// Post for editing user information:
UserRouter.post('/:userId/edit', async (req, res)=>{
    try {
        // Getting the description and username from request
        const {userId} = req.params
        // Destructuring from body:
        const {username, description} = req.body
        await User.findByIdAndUpdate(
            userId,
            { 
                username: username,
                description: description
            },
            {new: true},
        )
        const editedUser = await User.findById(userId).populate("collections");
        res.status(200).json({ user: editedUser, msg: "Successfully updated user info!" });
    }
    catch (err) {
        console.error(err);
        res.status(501).json({ msg: "Error changing user info!" })
    }
})


module.exports = {DashboardRouter, UserRouter};