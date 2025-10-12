import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import BookCard from '../components/BookCard'
import ListedBook from './ListedBook';

const BookListDisplay = () => {
    const navigate = useNavigate();
    // State variable: 
    const { colId } = useParams(); // Collection id: 
    const [currentBookList, setCurrentBookList] = useState([]);
    const [currentCollection, setCurrentCollection] = useState({});

    // Take book list:
    useEffect( () => { 
        // Fetching book collection: 
        const fetchCurrentCollection = async () => {
            try {
                // Fetching from collection id: 
                const res = await fetch(`http://localhost:3000/collection/${colId}`);
                if (!res.ok) {
                    throw new Error("Can't find book list!"); // Throwing error: 
                }
                const data = await res.json();
                const {books, col} =  data
                setCurrentCollection(col);
                setCurrentBookList(books); // Set current book list into response
            }
            catch (err) {
                console.error(err);
            }
        }
        // Calling the function:
        fetchCurrentCollection();
    }, [colId] );

    // Return: 
    return (
        <div className='mt-4 text-gray-900 bg-gray-50 px-10 rounded-lg py-10 flex items-center justify-start flex-col gap-5'>
            <div className='bg-gray-800 flex flex-col gap-5 justify-between w-full px-5 py-10 rounded-lg text-white'>
                <div className='flex flex-col gap-2'>
                    <h1 className='text-3xl font-light'>Collection:  <span className='font-medium'>{currentCollection.title}</span></h1>
                    <p className='font-semibold text-base'>By: {currentCollection.author}</p>
                    <p className='font-light text-sm'>{currentCollection.description}</p>
                </div>
                <button className='bg-white text-xl text-gray-900 rounded-lg py-2 px-15 text-center font-medium cursor-pointer'>Edit</button>
            </div>
            <div className='flex flex-col text-xl py-10 cursor-pointer gap-5 items-center w-full h-screen rounded-lg '>
                <div className='flex flex-col gap-5 items-center'>
                    <h1 className='text-2xl font-medium'>Current list of added books </h1>
                    <p>Total added - {currentBookList.length}</p>
                    <button onClick={()=>{navigate('/dashboard/discover')}} className='cursor-pointer outline-none bg-gray-800 rounded-lg text-white px-5 py-2'>Add more</button>
                </div>
                <ul className='gap-5 flex flex-col'>
                    {
                        currentBookList.map((currentBook)=>(
                            <ListedBook id={currentBook.googleId} title={currentBook.title} author={currentBook.author} description={currentBook.description} />
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default BookListDisplay

