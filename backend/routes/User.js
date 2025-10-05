// Importing routers: 
const {Router} = require('express');
const UserRouter = Router();

// find user
const {findUser} = require('../db/db')

// Routers: 
UserRouter.get('/:username', async (req, res)=>{
    try {
        // Retrieving the username:
        const {username} = req.params;
        // Searching for user: 
        const user = await findUser(username);
        if (!user) {
            return res.status(404).json({msg: "Error! can't find user"});
        }
        // Sending user-object back to front-end
        res.json(user);
    }
    catch (err) {
       return res.status(501).json({msg: "Server error..."})
    }
})

module.exports = UserRouter;