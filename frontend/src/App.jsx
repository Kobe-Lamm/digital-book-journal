import React from 'react'
import { Route, Routes } from 'react-router-dom'
// Importing Routes:
import Home from './pages/Home'
import About from './pages/About'
import NavBar from './components/NavBar'

const App = () => {
  return (
    <div className='px-10 py-5'>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About/>}></Route>
      </Routes>
    </div>
  )
}

export default App