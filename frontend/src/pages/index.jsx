import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/shared/navbar';

function IndexPage() {

    const [userMode, setUserMode] = useState('guest');

    const handleContinueAsGuestClick = () => {
        // Store the userMode in the localStorage
        localStorage.setItem('userMode', userMode);
    };

    return (
        <div>
            < Navbar />
            <div className="flex flex-col h-screen">

                <div className="mt-1 flex flex-col items-center justify-center flex-grow">
                    <h1 className="text-center text-4xl font-bold mb-4">Welcome to Cefalo Blog</h1>
                    <br />
                    <h1 className="text-center">
                        <Link to="/home" className="text-blue-600 hover:underline" onClick={handleContinueAsGuestClick}>
                            Continue as a guest
                        </Link>
                    </h1>
                </div>
            </div>

        </div>
    )
}

export default IndexPage;
