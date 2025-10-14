import React, { useState, useEffect } from 'react'
import { SquareX, Pen } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom';
import BookCard from '../components/BookCard'
import ListedBook from './ListedBook';
import {useAuth} from '../context/AuthContext'

const BookListDisplay = () => {
    const {currentUser} = useAuth();
    // Importing navigation:
    const navigate = useNavigate();
    // State variable: 
    const { colId } = useParams(); // Collection id: 
    const [currentBookList, setCurrentBookList] = useState([]);
    const [currentCollection, setCurrentCollection] = useState({});
    const [editing, setEditing] = useState(false);
    const [input, setInput] = useState({
        title: "",
        description: "",
    })
    // Handle input change:
    const handleChange = (e) => {
        const {value, name} = e.target;
        setInput((prev)=>({
            ...prev,
            [name]: value
        }))
    }
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

    const removeBook = async (colId, bookId) => {
        try {
            const res = await fetch(`http://localhost:3000/collection/${colId}/book/${bookId}`, {
                method: "DELETE",
            })
            if (!res.ok) {
                throw new Error("Can't remove book")
            }
            setCurrentBookList( (prev) => (
                prev.filter( (b) => b.googleId !== bookId )
            ))
        }
        catch (err) {
            console.error(err)
        }
    }
    const newEditChange = async () => {
        try {
            const res = await fetch(`http://localhost:3000/collection/${colId}/edit`, {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({ input }),
            })
            if (!res.ok) {
                throw new Error ("Can't edit collection...");
            }
            const data = await res.json()
            setCurrentCollection(data.collection);
        }
        catch (err) {
            console.error(err);
        }
    }
    // Deleting a collection:
    const deleteCollection = async () => {
        try {
            // Display second warning: 
            // Send info to back end
            const res = await fetch(`http://localhost:3000/collection/${colId}/delete`, {
                method: "DELETE",
            })
            if (!res.ok) {
                throw new Error("Can't delete collection!");
            }
            // redirect users:
            
            navigate(`/dashboard/${currentUser.username}`)
        }
        catch (err) {
            console.error(err);
        }

    }
    // Return: 
    return (
        <div className='mt-4 text-gray-900 bg-gray-50 px-10 rounded-lg py-10 h-auto flex items-center justify-start flex-col gap-5'>
            <div className='bg-gray-800 flex flex-col gap-5 justify-between w-full px-5 py-10 rounded-lg text-white'>
                <div className='flex flex-col gap-2'>
                    <h1 className='text-3xl font-light'>Collection:  {!editing ? <span className='font-medium'>{currentCollection.title}</span> :<div className='flex gap-2 items-center'><Pen/><input onChange={handleChange} value={input.title} name='title' className='px-2 py-4 w-[50%] font-medium outline-0' placeholder='Enter new collection name'></input></div> }</h1>
                    <p className='font-semibold text-base'>By: {currentUser.username}</p>
                    <p className='font-light text-sm'>{!editing ? currentCollection.description : <div className='flex gap-2'><Pen/><input className='outline-0 w-[50%] border-gray-500 rounded-lg' name="description" onChange={handleChange} value={input.description} placeholder='New description'></input></div>}</p>
                </div>
                    {!editing 
                    ? <button onClick={()=>{setEditing(true)}} className='bg-white text-xl text-gray-900 rounded-lg py-2 px-15 text-center font-medium cursor-pointer'>Edit</button> 
                    : <button onClick={()=>{
                        // Only send information if there's changes in the input:
                        if (input.title !== currentCollection.title || input.description !== currentCollection.description) {
                            console.log(input.title);
                            newEditChange();
                        }
                        // Change the mode:
                        setEditing(false)
                    }} className='bg-white text-xl text-gray-900 rounded-lg py-2 px-15 text-center font-medium cursor-pointer'>Done</button>}
                <button onClick={()=>{deleteCollection()}} className='bg-white text-xl text-gray-900 rounded-lg py-2 px-15 text-center font-medium cursor-pointer'>Delete collection</button>
            </div>
            <div className='flex flex-col text-xl py-10 cursor-pointer gap-5 items-center w-full rounded-lg '>
                <div className='flex flex-col gap-5 items-center'>
                    <h1 className='text-2xl font-medium'>Current list of added books </h1>
                    <p>Total added - {currentBookList.length}</p>
                    <button onClick={()=>{navigate('/dashboard/discover')}} className='cursor-pointer outline-none bg-gray-800 rounded-lg text-white px-5 py-2'>Add more</button>
                </div>
                <ul className='gap-5 flex flex-col'>
                    {
                        currentBookList.map((currentBook)=>(
                            <div className='hover:bg-gray-200 flex items-center justify-between py-2 px-4 rounded-lg'>
                                <ListedBook id={currentBook.googleId} title={currentBook.title} author={currentBook.author} description={currentBook.description} />
                                <SquareX onClick={()=>{removeBook(colId, currentBook.googleId)}} className='cursor-pointer hover:text-red-700' />
                            </div>
                        ))
                    }

                </ul>
            </div>
        </div>
    )
}

export default BookListDisplay

