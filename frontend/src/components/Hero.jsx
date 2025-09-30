import React from 'react'
import MainHeader from '../assets/main-header.png'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
    const navigate = useNavigate()
  return (
    <div className='flex flex-col md:flex-row rounded-lg mt-3 justify-evenly items-center gap-5'>
        
        {/* --Left Side-- */}
        <div className='flex gap-2 flex-col justify-center text-4xl md:text-5xl lg:text-6xl text-gray-800'>
            <div className='flex-1 font-semibold'>
                <p>Elevate your <br/></p>
                <p>Reading experience</p>
            </div>
            <button onClick={()=>{navigate('/signup')}} className='bg-gray-800 mt-5 text-base text-white rounded-lg px-12 py-2 hover:translate-y-[-10px] cursor-pointer transition-all duration-300'>Get started</button>
            <p className='mt-4 text-base font-light'>Already have an account? <span onClick={()=>{navigate('/login')}} className='font-semibold cursor-pointer'>Log In!</span></p>
        </div>
        
        {/* --Right Side-- */}
        <div className='flex-0.5 md:w-1/2 relative'>
            <img className='cursor-pointer max-w-full max-h-full bottom-0  rounded-lg' src={MainHeader} alt=""></img>
        </div>

    </div>
  )
}

export default Hero