const mongoose = require('mongoose');
const {CollectionSchema} = require('./Collection')

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    age: { type: Number, default: 0 },
    email: { type: String, required: true },
    collections: [{type: mongoose.Schema.Types.ObjectId, ref: "Collection"}],
    profile: {type: String, default: "" }, // Storing the profile image: 
    password: { type: String, required: true },
    joined: {type: Date, default: Date.now },
})

module.exports = mongoose.model( "User", UserSchema)