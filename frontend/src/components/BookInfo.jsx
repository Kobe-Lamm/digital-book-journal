import React from 'react'
import BookCard from './BookCard';
import { useState } from 'react';
import DOMpurify from "dompurify";

const BookInfo = ({title, authors, date, description, coverImg, categories = []}) => {
  
  const [trimmed, setTrimmed] = useState(true);
  const trimText = (string , maxLength = 20) => {
    if (trimmed) {
      if (string.length > maxLength) {
      return string.slice(0, 20) + " ..."
      } else {
        return string;
      }
    }
    else if (!trimmed) {
      return string
    }
  }

  return (
    <div className='cursor-pointer flex gap-4 rounded-lg flex-col'>
      <div className='flex items-center justify-between gap-4'>
        <div className='w-60 h-80 hover:translate-y-[-10px] transition-all duration-400'>
            <img className='w-full h-full rounded-lg' src={coverImg} alt=""></img>
        </div>
        <div className='flex-1 gap-2 flex flex-col'>
            <h1 onClick={()=>{setTrimmed(!trimmed)}} className='text-3xl font-medium text-gray-900'>{trimText(title)}</h1>
            <p className='flex gap-2 text-base font-light'>By 
              {authors.map((author)=>(
                <span className='font-medium'>{author ? author + " | " : "Unknown"}</span>
              ))}
            </p>
            <p className='text-base font-light'>Published: <span className='font-medium'>{date ? date : "Unknown"}</span></p>
            <p className='text-sm tracking-normal text-gray-600'
              dangerouslySetInnerHTML={{
                __html: description
                ? DOMpurify.sanitize(description)
                : "No description...",
              }}
            />
        </div>
      </div>
        <div className='flex overflow-x-scroll overflow-y-visible gap-4 items-center '>
            <p className='text-2xl font-medium underline underline-offset-3'>Categories: </p>
            <div className='flex gap-3 text-normal'>
              {
                categories.length > 0
                ? categories.map((category) => (
                  <p className='bg-gray-800 flex overflow-y-auto items-center justify-center  text-white  py-1 px-10  rounded-lg cursor-pointer hover:translate-y-[-2px] transition-all duration-500'>
                    {
                      category 
                    }
                  </p>
                ))
                : <p className='bg-gray-800 text-white rounded-lg py-3 px-10 cursor-pointer hover:translate-y-[-2px] transition-all duration-500'>Unknown</p>
              }
            </div>
        </div>
      <div>
      </div>
    </div>
  )
}

export default BookInfo