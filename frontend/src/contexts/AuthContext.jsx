import React, { createContext, useState } from 'react';
import { getAccessToken } from '../utils/token.util';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState({});

    const [isLoggedIn, setIsLoggedIn] = useState(!!getAccessToken());

    return (
        <AuthContext.Provider value={{ authData, setAuthData, isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
