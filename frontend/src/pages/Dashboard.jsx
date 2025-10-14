import React, { useState } from 'react'
import ShowCollections from '../components/ShowCollections';
import { useAuth } from '../context/AuthContext';
import {Pen} from 'lucide-react'


const Dashboard = () => {// Retrieving information
  const { currentUser } = useAuth()
  const [editing, setEditing] = useState(false);

  const [input] = useState({
    username: "",
    profileUrl: "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",
    description: ""
  })

  if (!currentUser) return <p>loading...</p>
  return (
    <div className='bg-gray-50 w-full h-auto rounded-lg px-5 py-5'>
      <div className='flex flex-col gap-3'>
        { /* Edit mode */ 
          editing
          // When in editing mode:
          ? <div className='flex items-center gap-4 justify-center'>
            
            <div className='hover:translate-x-[-5px] transition-all duration-300 flex gap-2 flex-col'>
              <div className='w-100 h-80'>
                <img className='rounded-4xl cursor-pointer ' src={input.profileUrl}></img>
              </div>
              <input className='rounded-lg border px-2 py-2 w-full bg-gray-900 text-white cursor-pointer hover:bg-gray-600' type='file'></input>
            </div>

            <div className='flex flex-col gap-3 items-start'>
              <h1 className='text-3xl font-medium'>Enter your username</h1>
              <div className='flex items-center gap-2'> <Pen /> <input className='text-xl outline-0 py-2 px-2' placeholder={currentUser.username} /> </div>
              <h1 className='text-3xl font-medium'>Tell us about yourself!</h1>
              <div className='flex items-center gap-2'> <Pen /> <input className='text-xl outline-0 px-2 py-2' placeholder={currentUser.description ? currentUser.description : "..."}></input> </div>
            </div>

          </div>
          // When out of editing mode
          : <div className='flex items-center justify-center'>
              <div className='w-80 h-80'>
                <img src={currentUser.profile}></img>
              </div>
              <div className='flex flex-col gap-4 items-start'>
                <h1 className='text-4xl font-light'>Welcome back: <span className='font-medium'>{currentUser.username}</span></h1>
                <p className='text-xl'>Joined: <span className='font-medium'>{new Date(currentUser.joined).toLocaleDateString('en-US', {month: 'numeric', year: 'numeric'})}</span></p>
                <p className='text-sm'>{currentUser.description ? currentUser.description : "No description..."}</p>
              </div>
          </div>
        }
        {
          editing 
          ? <button className='bg-gray-900 hover:bg-gray-600 rounded-lg cursor-pointer text-white w-full py-2' onClick={()=>{setEditing(false)}}>Done</button>
          : <button className='bg-gray-900  hover:bg-gray-600 rounded-lg cursor-pointer text-white w-full py-2' onClick={()=>{setEditing(true)}}>Edit</button>
        }
      </div>
      <ShowCollections />
    </div>
  )
}

export default Dashboard