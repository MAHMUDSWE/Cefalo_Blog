import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

import cefaloBlogLogo from "../assets/logo.jpg";

import indexPageLogo from "../assets/indexPage.svg";
import CefaloBlogLogo from '../components/shared/CefaloBlogLogo';


function IndexPage() {
    const [userMode, setUserMode] = useState('guest');

    const handleContinueAsGuestClick = () => {
        localStorage.setItem('userMode', userMode);
    };

    return (
        <div className="flex flex-row h-screen bg-gray-100">
            <div className="w-1/2 flex flex-col items-center justify-center">

                {/* <div className='inline-flex items-center gap-4'>
                    <img src={cefaloBlogLogo} className="w-70 h-70 " alt="Cefalo Blog Logo" />
                    <h1 className='text-blue-600 text-6xl font-bold'>Cefalo Blog</h1>

                </div>

                <br />
                <h1 className="text-center">
                    <Link to="/home" className="text-blue-600 text-lg hover:underline" onClick={handleContinueAsGuestClick}>
                        Continue as a guest
                    </Link>
                </h1> */}

                <CefaloBlogLogo />

                <object
                    type="image/svg+xml"
                    data={indexPageLogo}
                    className="max-h-[500px] "
                />
            </div>
            <div className="w-1/2">
                <Outlet />
            </div>
        </div>
    );
}

export default IndexPage;
