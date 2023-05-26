import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

import cefaloBlogLogo from "../assets/logo.jpg";


function IndexPage() {
    const [userMode, setUserMode] = useState('guest');

    const handleContinueAsGuestClick = () => {
        localStorage.setItem('userMode', userMode);
    };

    return (
        <div className="flex flex-row h-screen">
            <div className="w-1/2 flex flex-col items-center justify-center">

                <img src={cefaloBlogLogo} classNameName="w-300 h-60" alt="Cefalo Blog Logo" />


                <h1 className="text-center text-4xl font-bold mb-4">Welcome to Cefalo Blog</h1>
                <br />
                <h1 className="text-center">
                    <Link to="/home" className="text-blue-600 text-lg hover:underline" onClick={handleContinueAsGuestClick}>
                        Continue as a guest
                    </Link>
                </h1>
            </div>
            <div className="w-1/2">
                <Outlet />
            </div>
        </div>
    );
}

export default IndexPage;
