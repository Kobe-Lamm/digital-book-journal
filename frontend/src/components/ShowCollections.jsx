import React, {  useState } from 'react'
import CollectionCard from './CollectionCard'
import { NavLink } from 'react-router-dom'
import NewCollection from './NewCollection';
import { useAuth }from '../context/AuthContext'

const ShowCollections = () => {
    const { currentUser, setCurrentUser } = useAuth();
    const [visible, setVisible] = useState(false);
    // Creating a new collection: // State variables:
    const [input, setInput] = useState (
        {
        title: "",
        author: currentUser._id,
        description: ""
        }
    );
    if ( !currentUser ) return <p>loading...</p>
    // Handling change: 
    const handleChange = (e) => {
        const {name, value} = e.target;
        setInput({
        ...input,
        [name] : value,
        })
    }
    // Submitting form:
    const submitForm = async (e) => {
        e.preventDefault();
        try {
            // Send the name of the collection to the back
            const res = await fetch("http://localhost:3000/collection", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(input),
            });
            if (!res.ok) {
                throw new Error("Error creating new collection...")
            };
            // Parsing the response:
            const data = await res.json();
            setCurrentUser((prev)=>({
                ...prev,
                collections: [...currentUser.collections, data.collection]
            }));
            setInput({
                title: "",
                author: currentUser._id,
                description: "",
            })
            setVisible(false);
        }
        catch (err) {
            console.error(err)
        }
    } 
    // Returning JSX: 
    return (
        <div className='flex w-full mt-4 flex-col gap-4'>
            <button className='h-auto hover:bg-gray-600 cursor-pointer bg-gray-900 px-10 py-2 text-white rounded-lg' onClick={()=>{setVisible(true)}}>Create new collection</button>
            <div className='absolute top-50 left-135'>
                {visible 
                && <div className='bg-gray-900  px-10 py-10 rounded-lg flex flex-col gap-5'>
                        <div className=' text-white relative bg-gray-900 '>
                            <form className='flex flex-col gap-5' onSubmit={submitForm}>
                                <h1 className='text-3xl text-white font-medium'>Create a new collection</h1>
                                <input className='bg-gray-100  py-2 px-10 rounded-lg outline-0 text-gray-900 ' onChange={handleChange} value={input.title} name="title" placeholder="Enter your collection title"></input>
                                <input placeholder='Enter a description for your collection' className='bg-gray-100 py-2 px-10 rounded-lg outline-0 text-gray-900 ' onChange={handleChange} value={input.description}></input>
                                <button className='bg-gray-100 text-gray-900 rounded-lg py-2 px-10 cursor-pointer font-medium' type='submit'>Done</button>
                                <button className='cursor-pointer bg-gray-100 font-medium outline-none py-2 px-10 text-gray-900 rounded-lg px'  onClick={()=>setVisible(false)}>Cancel</button>
                            </form>
                        </div>
                    </div>
                }
            </div>
            <h1 className='text-3xl font-medium text-gray-800'>Your collections:</h1>
            <ul className='grid mb-10 grid-cols-1 md:grid-cols-5 lg:grid-cols-7 gap-3'>
                {currentUser.collections.map( (col) => (
                    <CollectionCard colId={col._id} description={col.description} author={currentUser.username} coverImg={col.image} title={col.title} />
                ) )}
            </ul>
        </div>
  )
}

export default ShowCollections