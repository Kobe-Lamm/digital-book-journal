import React, { useState } from 'react'
import ShowCollections from '../components/ShowCollections';
import { useAuth } from '../context/AuthContext';
import {Pen} from 'lucide-react'


const Dashboard = () => {// Retrieving information
  const { currentUser, setCurrentUser } = useAuth();
  // Files for profile picture:
  const [file, setFile] = useState(null);
  const [imageInput, setImageInput] = useState(`http://localhost:3000/${currentUser.profile}`);
  const [editing, setEditing] = useState(false);
  // User information
  const [input, setInput] = useState({
    username: currentUser.username,
    description: currentUser.description,
  })
  // Handle changing input:
  const handleChange = (e) => {
    const {name, value} = e.target;
    setInput((prev)=>({
      ...prev,
      [name]: value,
    }))
  }
  // Showing image preview: 
  const showPreview = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setImageInput(URL.createObjectURL(selectedFile));
  }
  // For uploading:
  const handleUpload = async () => {
    try {
      // Getting information: 
      const formData = new FormData(); // New formData : an object-like key-value pair for form submission where key represents field-names and values can be strings or files
      formData.append("avatar", file);
      // Uploading image to back end:
      const imgRes = await fetch(`http://localhost:3000/upload/${currentUser._id}`, {
        method: "POST",
        body: formData,
        credentials: 'include'
      });
      // Sending user input to back end:
      const inputRes = await fetch(`http://localhost:3000/user/${currentUser._id}/edit`, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(input),
      })
      // Handling errors:
      if (!imgRes.ok || !inputRes.ok) {
        throw new Error("Error changing user information!");
      }
      // Handling feedback:
      const inputData = await inputRes.json();
      if (imgRes.user) {setImageInput(imgRes.user)};
      setCurrentUser(inputData.user); // Setting current user to be the edited user
    }
    catch (err) {
      console.error(err)
    }
  }

  if (!currentUser) return <p>loading...</p>
  return (
    <div className='bg-gray-50 w-full h-auto rounded-lg px-5 py-5'>
      <div className='flex flex-col gap-3'>
        { /* Edit mode */ 
          editing
          // When in editing mode:
          ? <div className='flex flex-col md:flex-row items-center gap-4 justify-center'>
            
            <div className='hover:translate-x-[-5px] transition-all duration-300 flex gap-2 flex-col'>
              <img className='w-100 h-80 rounded-4xl cursor-pointer ' src={imageInput}></img>
              <input onChange={showPreview} name="avatar" className='rounded-lg border px-2 py-2 w-full bg-gray-900 text-white cursor-pointer hover:bg-gray-600' type='file'></input>
            </div>

            <div className='flex flex-col gap-3 items-start'>
              <h1 className='text-3xl font-medium'>Enter your username</h1>
              <div className='flex items-center gap-2'> <Pen /> <input onChange={handleChange} value={input.username} name="username" className='text-xl outline-0 py-2 px-2' placeholder={currentUser.username} /> </div>
              <h1 className='text-3xl font-medium'>Tell us about yourself!</h1>
              <div className='flex items-center gap-2'> <Pen /> <input onChange={handleChange} value={input.description} name="description" className='text-xl outline-0 px-2 py-2' placeholder={currentUser.description ? currentUser.description : "..."}></input> </div>
            </div>

          </div>
          // When out of editing mode
          : <div className='flex flex-col md:flex-row gap-5 items-center justify-center'>
              <img className='w-100 h-80 rounded-lg hover:translate-x-[-5px] transition-all duration-300 cursor-pointer' src={`http://localhost:3000/${currentUser.profile}`}></img>
              <div className='flex flex-col gap-4 items-start'>
                <h1 className='text-4xl font-light'>Welcome back: <span className='font-medium'>{ currentUser.username }</span></h1>
                <p className='text-xl'>Joined: <span className='font-medium'>{ new Date(currentUser.joined).toLocaleDateString('en-US', {month: 'numeric', year: 'numeric'}) }</span></p>
                <p className='text-sm'>{ currentUser.description }</p>
              </div>
          </div>
        }
        {
          editing 
          ? <button className='bg-gray-900 hover:bg-gray-600 rounded-lg cursor-pointer text-white w-full py-2' onClick={ ()=>{ setEditing(false), handleUpload()} }>Done</button>
          : <button className='bg-gray-900  hover:bg-gray-600 rounded-lg cursor-pointer text-white w-full py-2' onClick={ ()=>{setEditing(true)} }>Edit</button>
        }
      </div>
      <ShowCollections  />
    </div>
  )
}

export default Dashboard