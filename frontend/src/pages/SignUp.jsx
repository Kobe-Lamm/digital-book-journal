import React, { useState } from 'react'
import SignupPic from '../assets/signup-picture.jpg'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  // Hooks used: 
  const navigate = useNavigate();
  // State variables:
  const [valid, setValid] = useState(true);
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    checkPassword: ""
  })
  // Initializing book collections for users:
  const defaultCollections = [
    {title: "Reading", author: input.username, books:[] },
    {title: "Wants to read", author: input.username, books:[] },
    {title: "Already read", author: input.username, books:[]}
  ]
  // Submitting form and sending to backend: 
  const submitForm = async (e) => {
    // Prevent reloading
    e.preventDefault();
    // Checking passwords
    if (input.password !== input.checkPassword) {
      setValid(false);
      return
    }
    setValid(true);
    // Async funct: 
    try {
      if (valid === true) {
        const res = await fetch("http://localhost:3000/signup", {
          method:"POST", 
          headers:{"Content-Type":"application/json"},
          // Converting input variable to JSON string
          body: JSON.stringify({input, defaultCollections})
        })
        console.log(res.status);
        if (!res.ok) {
          setValid(false);
          throw new Error("Error submitting form");
        }
        // If signup is successful, redirect to login.
        navigate( "/login", { state: { message: "Please log in!" } } )
      } 
    } catch (err) {
      console.error(err)
      navigate("/signup")
    }
  }
  // Handling input change:
  const handleChange = (e) => {
    const {name, value} = e.target
    setInput((prev)=>({
      ...prev,
      [name]: value,
    }))
  }
  // Returning JSX: 
  return (
    <div className='grid grid-cols-2 gap-4'>
      <div className=''>
        <img className='cursor-pointer hover:translate-y-[-10px] transition-all duration-500 rounded-lg object-contain' src={SignupPic} alt="" />
      </div>
      <div className='text-normal font-normal justify-center items-center gap-4 flex flex-col'>
        <div className='text-red-500 font-medium'>{!valid ? "Error! Password entered does not match..." : ""}</div>
        <h1 className='text-3xl font-semibold'>Sign up</h1>
        <form onSubmit={submitForm} className='flex flex-col gap-4'>
          <input name="username" type="text" required value={input.username} onChange={handleChange} className='py-1 outline-none border rounded-lg px-10'  placeholder="Enter your username"></input>
          <input name="email" type="email" required value={input.email} onChange={handleChange} className='py-1 outline-none border rounded-lg px-10'  placeholder="Enter your email"></input>
          <input name="password" type="password" required value={input.password} onChange={handleChange} className='py-1 outline-none border rounded-lg px-10'  placeholder="Enter your password"></input>
          <input name="checkPassword" type="password" required value={input.checkPassword} onChange={handleChange} className='py-1 outline-none border rounded-lg px-10' placeholder="Re-enter your password"></input>
          <button className='cursor-pointer bg-gray-800 text-white py-2 rounded-lg' type="submit">Signup</button>
        </form>
        <p className='font-light'>Already have an account? <a href='/login' className='underline decoration-2 font-medium'>Log in!</a></p>
      </div>
    </div>
  )
}

export default SignUp