import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, NavLink } from 'react-router-dom';
import CollectionCard from '../components/CollectionCard';


const Dashboard = () => {
  // Getting the username fromt the url:
  const {username} = useParams();
  // Retrieving information
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(()=>{
    // fetching from back-end:
    const getCurrentUser = async () => {
      try {
        const res = await fetch(`http://localhost:3000/dashboard/${username}`);
        if (!res.ok) {
          throw new Error ("Error! Can't find user...")
        }
        const data = await res.json();
        setCurrentUser(data)
      }
      catch (err) {
        console.error(err)
      }
    }
    getCurrentUser();
  }, [username])

  if (!currentUser) return <p>loading...</p>
  return (
    <div>
        <h1 className='text-3xl font-semibold text-gray-900'>Welcome back: {currentUser.username.toUpperCase()}</h1>
        <button className='cursor-pointer' >Log out</button>
        <div className='flex flex-col'>
          <h1 className='text-xl font-medium text-gray-800'>Your collections:</h1>
          <ul className='flex gap-5 '>
            {currentUser.collections.map((col)=>(
              <NavLink key={col._id} to={`/collection/${col._id}`}>
                <CollectionCard title={col.title} author={col.author} description = {col.description} coverImg = {col.image} />
              </NavLink>
            ))}
          </ul>
        </div>
    </div>
  )
}

export default Dashboard