import React from 'react'
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ children }) => {
    var isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
        return <Navigate to="/" replace />;
    }
    return children;
}

const ProtectedRoutesBeforeLogin = ({ children }) => {
    var isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
        return <Navigate to="/news_feed" replace />;
    }
    return children;
}

export { ProtectedRoutes, ProtectedRoutesBeforeLogin };