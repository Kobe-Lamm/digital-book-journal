import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const DashNav = () => {
    const navigate = useNavigate();
    const {setLoggedIn, currentUser} = useAuth()

    const loggingOut = async () => {
        try {
             // Send request back to backend to remove token from cookie
            const res = await fetch("http://localhost:3000/logout", {
                method: "POST",
                credentials: 'include'
            })
            if (!res) {
                throw new Error("Error logging out...");
            }
            setLoggedIn(false);
            navigate("/");
        }
        catch (err) {
            console.error(err);
        }
       
    }
    return (
        <div>
            <nav className='flex justify-between items-center'>
                <NavLink className="hover:underline underline-offset-4 text-gray-800 hover:translate-y-[-5px] font-medium text-xl transition-all duration-500" to={`/dashboard/${currentUser.username}`} >PROFILE</NavLink>
                <NavLink className="hover:underline underline-offset-4  text-gray-800 hover:translate-y-[-5px] font-medium text-xl transition-all duration-500" to={`/dashboard/discover`} >DISCOVER</NavLink>
                <NavLink onClick={loggingOut} className="bg-gray-800 px-10 py-2 text-white rounded-lg hover:translate-y-[-2px] transition-all duration-500" to={"/"} >LOG OUT</NavLink>
            </nav>
        </div>
    )
}

export default DashNav