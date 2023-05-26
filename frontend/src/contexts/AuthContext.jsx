import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState(null);

    const updateAuthData = (newAuthData) => {
        setAuthData(newAuthData);
    };

    return (
        <AuthContext.Provider value={{ authData, updateAuthData }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
