import React from 'react'
import Search from '../components/Search'
import { useAuth } from '../context/AuthContext'

const Discover = () => {
  const {currentUser} = useAuth()
  return (
    <div>
        {!currentUser ? <></> : <h1 className='mt-3 text-3xl text-gray-900 font-medium'>Welcome back, {currentUser.username.toUpperCase()} !</h1> }
        <Search />
    </div>
  )
}

export default Discover