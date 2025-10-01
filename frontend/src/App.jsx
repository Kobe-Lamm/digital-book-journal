import React from 'react'
import { Route, Routes } from 'react-router-dom'

// Importing Routes:
import Home from './pages/Home'
import About from './pages/About'
import NavBar from './components/NavBar'
import Login from './pages/Login'

const App = () => {
  return (
    <div className='px-10 py-5'>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
    </div>
  )
}

export default App