import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import BookCard from '../components/BookCard';
import BookInfo from '../components/BookInfo';
import SimilarBooks from '../components/SimilarBooks';
import Search from '../components/Search'

const BookDetail = () => {
    const [currentBook, setCurrentBook] = useState(false);
    const {bookId} = useParams();
    // Fetching the book information:
    useEffect(()=>{
        const fetchId = async () => {
            try {
                const res = await fetch(`http://localhost:3000/book/${bookId}`);
                if (!res.ok) {
                    throw new Error("Error! Book not found...")
                }
                const data = await res.json()
                setCurrentBook(data);
            }
            catch (err) {
                console.error(err);
            }
        }
       fetchId();
    },[bookId])
    return (
        <div  className='bg-gray-50 h-screen px-10 py-4'>
            {
                !currentBook 
                ? <div>
                    <FontAwesomeIcon className=' text-gray-800 text-2xl animate-spin' icon={faSpinner}></FontAwesomeIcon>
                    <p>Loading...</p>
                </div> 
                : <div>
                    <div>
                        <BookInfo  key={currentBook.id} title={currentBook.volumeInfo.title} authors={currentBook.volumeInfo.authors} coverImg={currentBook.volumeInfo.imageLinks.thumbnail} description={currentBook.volumeInfo.description} categories={currentBook.volumeInfo.categories} />
                    </div>
                    <hr/>
                    <div>
                        <SimilarBooks categories={currentBook.volumeInfo.categories} />
                    </div>
                </div>
            }
            <Search />
        </div>
  )
}

export default BookDetail