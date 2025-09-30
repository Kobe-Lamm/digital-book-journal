import React from 'react'
import { useState } from 'react'

const Search = () => {
    const [input, setInput] = useState("")
    
    const onChange = (e) => {
        setInput(e.target.value);
    }
   
    return (
    <div className='mt-10'>
        <div>
            
            <input
             className=''
             onChange = {onChange()}
             value = {input}
             placeholder="Search for your books"></input>
        </div>
        <div>
            Search result
        </div>
        <div>
            <ul>
                <li>Thriller</li>
                <li>Romance</li>
                <li>Fantasy</li>
                <li>Classics</li>
                <li>Self-help</li>
                <li>Children's books</li>
            </ul>
        </div>
    </div>
  )
}

export default Search