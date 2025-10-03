// Dependencies:
require('dotenv').config();
const apiKey = process.env.GOOGLE_BOOKS_API;

// Fetch from most trending books:
const fetchTrending = async () => {
    try {
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:fiction+fantasy&key=${apiKey}`);
        if (!res.ok) {
             console.error( "Fetch failed",res.status, text )
            throw new Error("Error fetching books...");
        }
        const data = await res.json();
        return data.items || [];
    }
    catch (err) {
        console.error(err);
    }
}

// Fetching specific book:
const fetchBookId = async (bookId) => {
    const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
    if (!res.ok) {
        throw new Error("Error! Book not found...");
    }
    const data = await res.json();
    return data;
}

// Fetching for any match
const fetchBooks = async (value) => {
    try {
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(value)}&orderBy=relevance&langRestrict=en&maxResults=40&startIndex=0&key=${apiKey}`);
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

// Fetching based on categories:
const fetchByCategory = async (category) => {
    try {
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${encodeURIComponent(category)}&key=${apiKey}&orderBy=newest&maxResults=40&startIndex=0`);
        if (!res.ok) {
            throw new Error("Error fetching books...")
        }
        const data = await res.json();
        return data;
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

module.exports = {fetchBooks, fetchByAuthor, fetchByTitle, fetchTrending, fetchBookId, fetchByCategory}