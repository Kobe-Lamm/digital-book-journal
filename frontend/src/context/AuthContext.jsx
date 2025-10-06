import React from 'react'
import { useContext } from 'react';
import { createContext } from 'react'
import { useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    // Context variables:
    const [loggedIn, setLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    // Returning it 
    return (
        <AuthContext.Provider value={ {loggedIn, setLoggedIn, currentUser, setCurrentUser} }>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext)
