import React from 'react'
import { useAuth } from '../context/AuthContext'
import {useParams} from 'react-router-dom'


const CollectionList = () => {
    const {currentUser} = useAuth();
    const { bookId } = useParams();

    const addToCollection = async (colId) => {
        try {
            // Post request to send book id to backend:
            const res = await fetch(`http://localhost:3000/collection/${colId}`, {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({ bookId })
            })
            console.log(res);
            // If unsuccessful:
            if (!res.ok) {
                throw new Error("Can't add book to new collection")
            }
            // If successful:
            alert("Successfully added new book!")
        }
        catch (err) {
            console.error(err)
        }
    }

    return (
        <div className='bg-gray-300 flex flex-col gap-3'>
            <h1 className='text-xl text-gray-900 font-medium'>Your collections: </h1>
            <ul className='flex flex-col gap-2 text-normal font-normal text-gray-600'>
                {currentUser.collections.map((col)=>(
                    <li onClick={()=>addToCollection(col._id)} className='hover:bg-gray-600 hover:text-white py-1 rounded-lg px-2 cursor-pointer' key={col._id}>
                        <p>{col.title}</p>
                    </li>
                ))}
            </ul>
        </div>
  )
}

export default CollectionList