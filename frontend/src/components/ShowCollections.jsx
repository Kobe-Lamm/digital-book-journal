import React, { useState } from 'react'
import CollectionCard from './CollectionCard'
import { NavLink } from 'react-router-dom'
import NewCollection from './NewCollection';

const ShowCollections = ({currentUser}) => {
    const [visible, setVisible] = useState(true);

    if ( !currentUser ) return <p>loading...</p>
    return (
    <div className='flex flex-col gap-4'>
        <h1 className='text-xl font-medium text-gray-800'>Your collections:</h1>
        <button className='cursor-pointer bg-gray-900 px-10 py-2 text-white rounded-lg' onClick={()=>{setVisible(true)}}>Create new collection</button>
        <div>
            {visible 
             ? <NewCollection />
             : ""
            }
        </div>
        <ul className='flex items-center justify-evenly gap-3'>
            {currentUser.collections.map((col)=>(
                <CollectionCard id={col._id} description={col.description} author={col.author} coverImg={col.image} title={col.title} />
            ))}
        </ul>
    </div>
  )
}

export default ShowCollections