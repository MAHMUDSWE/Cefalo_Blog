import React, { createContext, useState } from 'react';
import { getAccessToken } from '../utils/token.util';
import { useQuery } from "@tanstack/react-query";
import UserService from '../services/user.service';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState({});

    const [isLoggedIn, setIsLoggedIn] = useState(!!getAccessToken());

    useQuery({
        enabled: isLoggedIn,
        queryKey: ["getUserById"],
        queryFn: async () => {
            const data = await UserService.getUserById();
            setAuthData(data);
            return data;
        },
    });

    return (
        <AuthContext.Provider value={{ authData, setAuthData, isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
