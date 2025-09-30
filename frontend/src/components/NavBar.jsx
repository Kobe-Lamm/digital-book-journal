import React from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {
    const navigate = useNavigate();
    return (
        <div className='text-gray-800 font-normal text-xl'>
            <nav className=''>
                <ul className='hidden text-base md:flex gap-8 justify-between items-center mb-5 text-gray-700'>
                    <p onClick={()=>{navigate('/')}} className='font-semibold cursor-pointer'>READIFY</p>
                    <NavLink className='hover:underline decoration-3 hover:translate-y-[-2px] transition-all duration-300 underline-offset-5' to="/about">About</NavLink>
                    <NavLink className='hover:underline decoration-3 hover:translate-y-[-2px] transition-all duration-300 underline-offset-5' to="/discover">Discover</NavLink>
                    <NavLink className='hover:underline decoration-3 hover:translate-y-[-2px] transition-all duration-300 underline-offset-5' to="/signup">Sign Up</NavLink>
                    <NavLink className='border-2 border-gray-800 px-10 py-2 rounded-lg text-gray-800 hover:bg-gray-800 hover:text-white transition-all duration-200 underline-offset-4' to="/login">Log In</NavLink>
                </ul>
            </nav>
        </div>
    )
}

export default NavBar