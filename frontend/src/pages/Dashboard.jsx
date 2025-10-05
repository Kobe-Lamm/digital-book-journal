import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';


const Dashboard = () => {
  // Navigate:
  const navigate = useNavigate();
  // Getting the username fromt the url:
  const {username} = useParams();
  // Retrieving information
  const [currentUser, setCurrentUser] = useState({});
  // Logging out:
  const logOut = async () => {
    try {
      const res = await fetch("http://localhost:3000/logout");
      navigate('/home');
    }
    catch (err) {
      console.error(err)
    }
  }

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

  return (
    <div>
        <h1>Welcome back {currentUser.username}</h1>
        <button className='cursor-pointer' onClick={logOut} >Log out</button>
        <div>
          <h1>Your collections:</h1>
          <p></p>
        </div>
    </div>
  )
}

export default Dashboard