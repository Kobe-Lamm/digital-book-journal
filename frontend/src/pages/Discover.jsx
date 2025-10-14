import React from 'react'
import Search from '../components/Search'
import { useAuth } from '../context/AuthContext'
import Trending from '../components/Trending'

const Discover = () => {
  const {currentUser} = useAuth()
  return (
    <div>
        {!currentUser 
        ? <></> 
        : <div>
            <h1 className='mt-3 text-3xl text-gray-900 font-medium'>Welcome back, {currentUser.username} !</h1>
            <Trending />
          </div> 
        }
        <Search />
    </div>
  )
}

export default Discover