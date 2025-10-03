import React from 'react'
import { useState, useEffect } from 'react'
import BookCard from './BookCard';

const SimilarBooks = ({ categories = [] }) => {
    // state to keep track of current similar books:
    const [similarBooks, setSimilarBooks] = useState([]);
    // Fetching similar books based on categories: 
    useEffect(()=>{
        const fetchSimilarBook = async () => {
            try {
                const res = await fetch("http://localhost:3000/book/category", {
                    method: "POST",
                    headers:{"Content-Type":"application/json"},
                    body: JSON.stringify( {categories} )
                })
                if (!res.ok) {
                    throw new Error("Error fetching books...")
                }
                const data = await res.json();
                setSimilarBooks(data.items || []);
            }
            catch (err) {
                console.error(err);
            }
        }
        fetchSimilarBook();
    },[categories])
    return (
        <div>
            {
                categories.length > 0 
                ? <div className='flex flex-col gap-3 mt-4'>
                    <h1 className='text-3xl text-gray-900 font-medium'>Other books you may enjoy:</h1> 
                    <div className='flex gap-4 overflow-x-scroll'>
                        {similarBooks.map((similarBook)=>(
                            <BookCard bookId={similarBook.id} title={similarBook.volumeInfo.title} authors={similarBook.volumeInfo.authors} coverImg={similarBook.volumeInfo.imageLinks.thumbnail} />
                        ))}
                    </div>
                </div>
                : <div>"Sorry, we couldn't find other similar books"</div>
            }
        </div>
    )
}

export default SimilarBooks