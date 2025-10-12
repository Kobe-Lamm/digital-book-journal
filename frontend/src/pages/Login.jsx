// Dependencies:
import React from 'react'
import LoginPic from '../assets/login-picture.jpg'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Logging in: 
const Login = () => {
  // Authenticate context: 
  const { setLoggedIn, setCurrentUser } = useAuth();
  // Navigation:
  const navigate = useNavigate();
  // State variables: 
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: ""
  })
  // Handle input change: 
  const handleChange = (e) => {
    const {name, value} = e.target;
    setInput(prev => ({
      ...prev, 
      [name]: value,
    }))
  }
  // Sending information to backend:
  const sendInfo = async (e) => {
    console.log(input.password)
    // Prevent reloading
    e.preventDefault();
    // Async
    try {
      // Fetching from backend
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(input),
        credentials:"include",
      })
      if (!res.ok) {
        throw new Error("Error logging in");
      }
      const data = await res.json() // Should be the json web token
      setLoggedIn(true);
      setCurrentUser(data);
      console.log(data)
      navigate(`/dashboard/${data.username}`); // Navigate to personal dashboard
    }
    catch (err) {
      console.error(err)
    }
  }
  // Return jsx:
  return (
    <div className='grid grid-cols-2'>
      <div className='cursor-pointer hover:translate-y-[-10px] transition-all duration-500 flex-1 h-full'>
        <img className='rounded-lg' src={LoginPic} alt=""></img>
      </div>
      <div className='flex flex-col items-center gap-5 justify-center'>
        <h1 className='cursor-pointer text-3xl font-semibold'>Please login</h1>
        <form onSubmit={sendInfo} className='flex gap-5 text-base flex-col' action='/login' method='POST'>
          <input name='username' onChange={(e)=>handleChange(e)} value={input.username} type='text' className='outline-none border rounded-lg px-10 py-1' placeholder='Enter your username'></input>
          <input name='email' onChange={(e)=>handleChange(e)} value={input.email} type='email' className='outline-none border rounded-lg px-10 py-1' placeholder='Enter your email'></input>
          <input name='password' onChange={(e)=>handleChange(e)} value={input.password} type='password' className='outline-none border rounded-lg px-10 py-1' placeholder='Enter your password'></input>
          <button className='bg-gray-800 rounded-lg py-2 text-white cursor-pointer' type='submit'>Log in</button>
        </form>
        <p className='font-light'>Don't have an account? <a href='/signup' className='font-medium underline decoration-3 leading-relaxed cursor-pointer'>Create one</a></p>
      </div>
    </div>
  )
}

export default Login