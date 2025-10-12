import React from 'react'
import { useNavigate } from 'react-router-dom'

const ListedBook = ({title, author, id}) => {
    const navigate = useNavigate();
    return (
        <div className='hover:bg-gray-200 px-4 rounded-lg py-4' onClick={()=>{navigate(`/book/${id}`)}}>
            <div key={id} className='flex gap-5'>
                <h3 className='font-medium'>{title}</h3>
                {author.map((aut)=>(
                    <li className='font-light'>{aut}</li>
                ))}
            </div>
        </div>
    )
}

export default ListedBook