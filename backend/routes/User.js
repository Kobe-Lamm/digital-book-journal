// Importing routers: 
const {Router} = require('express');
const UserRouter = Router();

// find user
const {findUser, findCollection} = require('../db/db');
const User = require('../models/User');

// Routers: 
// Relating to users
UserRouter.get('/:username', async (req, res)=>{
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


module.exports = UserRouter;