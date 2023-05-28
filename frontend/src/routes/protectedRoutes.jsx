import React from 'react'
import { Navigate } from 'react-router-dom';

const LoggedOutMode = ({ children }) => {
    var isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
        return <Navigate to="/" replace />; // without logging if a user try to access profile route it will automatically redirect the user to "/" this route
    }
    return children; // if logged in it will redirect the user to the route user wants
}

const LoggedInMode = ({ children }) => {
    var isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
        return <Navigate to="/" replace />;
    }
    return children;
}

const GuestOrLoggedInMode = ({ children }) => {
    var isLoggedIn = localStorage.getItem("isLoggedIn");
    var isGuest = localStorage.getItem("userMode");

    if (!isGuest && !isLoggedIn) {

        return <Navigate to="/" replace />;
    }
    return children;
}

const NotGuestOrLoggedInMode = ({ children }) => {
    var isLoggedIn = localStorage.getItem("isLoggedIn");
    var isGuest = localStorage.getItem("userMode");

    if ( isLoggedIn ) {

        return <Navigate to="/home" replace />;
    }
    return children;
}

export { LoggedOutMode, LoggedInMode, GuestOrLoggedInMode, NotGuestOrLoggedInMode };