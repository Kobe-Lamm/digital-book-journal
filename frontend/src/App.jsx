import React from 'react'
import { Route, Routes } from 'react-router-dom'

// Importing Routes:
import Home from './pages/Home'
import About from './pages/About'
import NavBar from './components/NavBar'
import Login from './pages/Login'
import Discover from './pages/Discover'
import BookDetail from './pages/BookDetail'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard.jsx'

const App = () => {
  return (
    <div className='px-10 py-5'>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path ="/signup" element={<SignUp/>}></Route>
        <Route path="/book/:bookId" element={<BookDetail/>}></Route>
        <Route path="/discover" element={<Discover/>}></Route>
        <Route path="/dashboard/:userId" element={<Dashboard/>}></Route>
      </Routes>
    </div>
  )
}

export default App