import React from 'react'
import { useContext } from 'react';
import { createContext } from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    // Importing use Navigate: 
    const navigate = useNavigate();
    // Context variables:
    const [loggedIn, setLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    // Checking if user is logged in everytime: 
    useEffect(()=>{
        const verifyUser = async () => {
            try {
                const res = await fetch("http://localhost:3000/verify", { credentials: "include" });
                // Handling expired token
                if ( res.status === 403 || res.status === 401) {
                    // Sending a request to refresh the token
                    const refreshAccess = await fetch("http://localhost:3000/refresh", {method: "Post", credentials: "include"});
                    // If the access token has expired
                    if (!refreshAccess.ok) {
                        await fetch("http://localhost:3000/logout", {method: "Post", credentials: "include"});
                        setLoggedIn(false);
                        setCurrentUser(null);
                        navigate("/login", {replace: true});
                        return;
                    }
                    // Issuing a new refresh token: 
                    const verifyAgain = await fetch("http://localhost:3000/verify", { method: "GET", credentials: "include" });
                    if (verifyAgain.ok) {
                        const data = await verifyAgain.json();
                        setLoggedIn(true);
                        setCurrentUser(data.user);
                        return;
                    }
                } 
                const data = await res.json()
                setCurrentUser(data.user);
                setLoggedIn(true);
            }
            catch (err) {
                console.error(err);
            }
        }
        verifyUser();
    }, [])

    // Returning The Context:
    return (
        <AuthContext.Provider value={ {loggedIn, setLoggedIn, currentUser, setCurrentUser} }>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext)
