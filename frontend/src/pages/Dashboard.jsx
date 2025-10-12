import React from 'react'
import ShowCollections from '../components/ShowCollections';
import { useAuth } from '../context/AuthContext';



const Dashboard = () => {// Retrieving information
  const { currentUser } = useAuth()

  if (!currentUser) return <p>loading...</p>
  return (
    <div>
        <h1 className='text-3xl font-semibold text-gray-900'>Welcome back: {currentUser.username.toUpperCase()}</h1>
        <ShowCollections currentUser={currentUser} />
    </div>
  )
}

export default Dashboard