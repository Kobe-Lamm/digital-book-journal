// Dependencies:
require('dotenv').config();
const apiKey = process.env.GOOGLE_BOOKS_API;

// Fetching for any match
const fetchBooks = async (value) => {
    try {
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${value}&key=${apiKey}&orderBy=relevance&maxResults=40&startIndex=0`);
        if (!res.ok) {
            throw new Error("Error fetching books...")
        } 
        const data = await res.json()
        return data.items || [];
    }
    catch (err) {
        console.log(err);
        return []
    }
}

// Fetching based on author of book
const fetchByAuthor = async (authorName) => {
    try {
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(authorName)}+inauthor:keyes&key=${apiKey}&orderBy=relevance&maxResult=40&startIndex=0`)
        if (!res.ok) {
            throw new Error("Error fetching books...");
        } 
        return res.json();
    }
    catch (err) {
        console.error(err)
    }
}

// Fetching based on title of book
const fetchByTitle = async (title) => {
    try {
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(title)}+intitle:keyes&key=${apiKey}`);
        if (!res.ok) {
            throw new Error("Error fetching books...");
        } 
        return res.json();
    }
    catch (err) {
        console.error(err)
    }
}

module.exports = {fetchBooks, fetchByAuthor, fetchByTitle}