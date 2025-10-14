import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const NewCollection = () => {
  // State variables:
  const {currentUser}= useAuth();
  const navigate = useNavigate();
  const [input, setInput] = useState(
    {
      title: "",
      author: currentUser._id,
      description: ""
    }
  );
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
      console.log(data);
      console.log(currentUser);
      navigate(`/dashboard/${currentUser.username}`)
    }
    catch (err) {
      console.error(err)
    }
  }
  // Return:
  return (
    <div className=' text-white relative bg-gray-900 '>
        <form className='flex flex-col gap-5' onSubmit={submitForm}>
            <h1 className='text-3xl text-white font-medium'>Create a new collection</h1>
            <input className='bg-gray-100 py-2 px-10 rounded-lg outline-0 text-gray-900 ' onChange={handleChange} value={input.title} name="title" placeholder="Enter your collection title"></input>
            <input name="description" placeholder='Enter a description for your collection' className='bg-gray-100 py-2 px-10 rounded-lg outline-0 text-gray-900 ' onChange={handleChange} value={input.description}></input>
            <button className='bg-gray-100 text-gray-900 rounded-lg py-2 px-10 cursor-pointer font-medium' type='submit'>Done</button>
        </form>
    </div>
  )
}

export default NewCollection