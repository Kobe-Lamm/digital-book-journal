import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const BookDetail = () => {
    const [currentBook, setCurrentBook] = useState(null);
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
        <div>
            {
                !currentBook 
                ? <p>Loading...</p> 
                : <div key={currentBook.id}>
                    <div>
                        <div>
                            <p>{currentBook.volumeInfo.title}</p>
                            <p>{currentBook.volumeInfo.authors}</p>
                            <p>{currentBook.volumeInfo.description}</p>
                        </div>
                        <div>
                            <img src={currentBook.volumeInfo.imageLinks.thumbnail} />
                        </div>
                    </div>
                    <div>

                    </div>
                </div>
            }
        </div>
  )
}

export default BookDetail