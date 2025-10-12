import React from 'react'
import { useState, useEffect } from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch, faSpinner} from '@fortawesome/free-solid-svg-icons'
import BookCard from './BookCard'

const Search = () => {
    // State variables
    const [books, setBooks] = useState([]);
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false);
    // Fetching:
    const fetchTrending = async () => {
        try {
            const res = await fetch("http://localhost:3000/");
            if (!res.ok) {
                throw new Error("Error fetching...");
            }
            const data = await res.json();
            setBooks(data);
        }
        catch (err) {
            console.error(err)
        }
    }
    // Setting input variable to be user input
    const onChange = (e) => {
        setInput(e.target.value);
    };
    // UseEffect:
    useEffect( ()=>{
        if (input === "") {
            fetchTrending();
        } 
    }, [input]);
    
    const fetchingData = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:3000/", {
                method:"POST",
                headers:{"Content-Type" : "application/json"},
                body: JSON.stringify({query: input}),
            })
            const data = await res.json();
            setBooks(data);
        } 
        catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    };
    // Handling Click:
    const handleClick = async (e) => {
        try {
            e.preventDefault();
            await fetchingData();
        } 
        catch (err) {
            console.error(err)
        }
    }
    // Returning element:
    return (
        <div className='mt-10'>
            <div className='flex items-center justify-evenly gap-10'>
                <div className='w-full justify-start gap-2 flex items-center bg-gray-800 text-white rounded-lg py-2'>
                    <FontAwesomeIcon className='px-3' icon={faSearch}></FontAwesomeIcon>
                    <input
                        className='w-full outline-0'
                        onChange = {onChange}
                        value = {input}
                        placeholder="Search for your books"></input>
                </div>
                <button type="button" onClick={handleClick} className='cursor-pointer bg-gray-800 text-white px-10 py-2 rounded-lg'>Search</button>
            </div>
            <div className='bg-gray-50 curounded-lg mt-5 px-5 py-5 grid md:grid-cols-3 lg:grid-cols-5 grid-cols-1 gap-1 md:gap-3 lg:gap-5 items-start'>
                    {loading === false ? books.map((book)=>(
                        <BookCard title={book.volumeInfo.title} authors={book.volumeInfo.authors} bookId={book.id} coverImg = {book.volumeInfo.imageLinks.thumbnail} />
                    )) : 
                        <div className='flex gap-2 text-2xl text-gray-600 font-light justify-center items-center text-center'>
                            <FontAwesomeIcon className='animate-spin' icon={faSpinner} />
                            <p>Loading...</p>
                        </div>
                    }
            </div>
        </div>
  )
}

export default Search