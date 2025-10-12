import React from 'react'
import { useNavigate } from 'react-router-dom'

const CollectionCard = ({id, title, author, description, coverImg}) => {
  const navigate = useNavigate();
  return (
    <div onClick={()=>{
      navigate(`/collection/${id}`)
    }} className='cursor-pointer rounded-lg hover:translate-y-[-10px] transition-all duration-500 flex flex-col w-40 h-60'>
      <div>
        <img className='rounded-lg' src={coverImg}></img>
      </div>
      <div>
        <p className='text-xl font-medium text-gray-800'>{title}</p>
        <p className='font-normal text-gray-600 text-base'>By: {author}</p>
        <p className='font-light text-gray-600 text-sm'>{description}</p>
      </div>
    </div>
  )
}

export default CollectionCard