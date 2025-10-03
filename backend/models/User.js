const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    age: {type: Number, default: 0},
    email: {type: String, required: true},
    password: {type: String, required: true},
    joined: {type: Date, default: Date.now()},
})

module.exports = mongoose.model( "User", UserSchema)