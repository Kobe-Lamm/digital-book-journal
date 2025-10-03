import React from 'react'
import { useNavigate } from 'react-router-dom'

const BookCard = ({bookId ,title, coverImg, authors}) => {
    const navigate = useNavigate();
    // Trimming text:
    const trimText = (string, maxLength = 30) => {
      const newString = string.length > maxLength ? string.slice(0,maxLength) + "..." : string;
      return newString;
    }

    return (
      <div key={bookId} className='cursor-pointer hover:translate-y-[-10px] transition-all duration-500' onClick={()=>{navigate(`/book/${bookId}`)}}>
        <div className='w-60 h-80 shadow-xl'>
          <img className='w-full h-full object-cover mb-2 rounded-lg' src={coverImg} />
        </div>
        <div>
          <p className='text-normal font-medium text-gray-900'>{trimText(title)}</p> 
          <div className='flex gap-2 text-gray-600'>
            <p className='text-sm'>By</p> 
            <span className='text-sm'>{authors ? trimText(authors) : "Unknown"}</span>
          </div>
        </div>
      </div>
    )
}

export default BookCard