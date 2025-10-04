// Importing routers: 
const {Router} = require('express');
const UserRouter = Router();

// find user
const {findUser} = require('../db/db')

// Routers: 
UserRouter.get('/:userId', async (req, res)=>{
    try {
        
    }
    catch (err) {

    }
})

module.exports = UserRouter;