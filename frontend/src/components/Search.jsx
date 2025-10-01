import React from 'react'
import { useState } from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import BookCard from './BookCard'

const Search = () => {
    const [books, setBooks] = useState([]);
    const [input, setInput] = useState("")
    
    const onChange = (e) => {
        setInput(e.target.value);
    };

    const fetchingData = async (e) => {
        try {
                e.preventDefault();
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
        }
    }
   
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
                <button type="button" onClick={fetchingData} className='cursor-pointer bg-gray-800 text-white px-10 py-2 rounded-lg'>Search</button>
            </div>
            <div className='bg-gray-50 curounded-lg mt-5 px-5 py-5 grid grid-cols-8 gap-5 items-start'>
                    {books.map((book)=>(
                        <div className='cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
                            <div className=''>
                                <img className='w-40 h-60 object-cover mb-2 rounded-lg' src={book.volumeInfo.imageLinks.thumbnail}></img>
                            </div>
                            <p className=' text-base text-gray-800 font-light'><span className='font-medium'>{book.volumeInfo.title}</span> By <span className='font-medium'>{book.volumeInfo.authors}</span></p>
                        </div>
                    ))}
            </div>
        </div>
  )
}

export default Search