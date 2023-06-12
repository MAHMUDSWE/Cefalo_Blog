import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import indexPageLogo from "../assets/indexPage.svg";
import CefaloBlogLogo from '../components/shared/CefaloBlogLogo';


function IndexPage() {
    const [userMode, setUserMode] = useState('guest');

    const handleContinueAsGuestClick = () => {
        localStorage.setItem('userMode', userMode);
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100 sm:flex-row">
            <div className="-mb-48 z-10 sm:mb-0 sm:w-1/2 flex flex-col items-center justify-center">

                <CefaloBlogLogo />

                <object
                    type="image/svg+xml"
                    data={indexPageLogo}
                    className="max-h-[500px] "
                />
            </div>
            <div className="sm:w-1/2">
                <Outlet />
            </div>
        </div>
    );
}

export default IndexPage;
