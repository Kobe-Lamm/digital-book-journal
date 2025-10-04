import React from 'react'
import aboutImg from '../assets/about-picture.jpg'

const About = () => {
  return (
    <div className='flex justify-between'>
      <div className='flex-1 flex flex-col gap-5'>
        <p className='text-3xl text-gray-900 font-medium underline underline-offset-4 decoration-4'>Our mission:</p>
        <div className='text-xl font-normal text-gray-600  gap-4 flex flex-col'>
          <p>This is your digital space to think, feel, and grow through reading. Our book journal helps you capture reflections, track your reading progress, and connect ideas across stories.</p>
          <p>Whether you're exploring classics, nonfiction, or modern novels, this is where your thoughts turn into insight.</p>
          <p>Read deeply. Reflect meaningfully. Remember everything that matters.</p>
        </div>
        <a href='/login'>
          <button className='cursor-pointer bg-gray-900 text-white px-10 py-2 rounded-lg'>Log in</button>
        </a>
      </div>
      <div className='flex-1'>
        <img className='rounded-lg hover:translate-y-[-10px] duration-500 transition-all cursor-pointer' src={aboutImg} ></img>
      </div>
    </div>
  )
}

export default About