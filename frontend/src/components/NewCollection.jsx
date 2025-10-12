import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext';

const NewCollection = () => {
  const {currentUser}= useAuth();
  const [input, setInput] = useState(
    {
      title: "",
      author: currentUser.username,
      description: ""
    }
  );
  const handleChange = (e) => {
    const {name, value} = e.target;
    setInput({
      ...input,
      [name] : value,
    })
  }
  return (
    <div className='relative '>
        <form>
            <h1>Create a new collection</h1>
            <input onChange={handleChange} value={input.title} name="title" placeholder="Enter your collection title"></input>
            <input onChange={handleChange} value={input.description}></input>
            <button>Done</button>
        </form>
    </div>
  )
}

export default NewCollection