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
import DashNav from './components/DashNav.jsx'
import { useAuth } from './context/AuthContext.jsx'
import CollectionList from './components/CollectionList.jsx'
import BookListDisplay from './components/BookListDisplay.jsx'


const App = () => {
  const {loggedIn} = useAuth()
  return (
    <div className='px-10 py-5'>
      {!loggedIn && <NavBar />} {loggedIn && <DashNav />}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path ="/signup" element={<SignUp/>}></Route>
        <Route path="/book/:bookId" element={<BookDetail/>}></Route>
        <Route path="/discover" element={<Discover/>}></Route>
        <Route path="/dashboard/discover" element={<Discover/>}></Route>
        <Route path="/dashboard/:username" element={<Dashboard/>}></Route>
        <Route path="/collection/:colId" element={<BookListDisplay />}></Route>
      </Routes>
    </div>
  )
}

export default App