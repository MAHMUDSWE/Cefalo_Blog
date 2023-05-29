import React, { useState } from 'react'
import blogLogo from "../../assets/logo.jpg";

import CreateNewAccountButton from './CreateNewAccountButton';
import CefaloBlogLogo from '../shared/CefaloBlogLogo';
import ForgottenPassword from './ForgottenPassword';

export default function Login() {

    const handleLogin = (event) => {

        event.preventDefault();
        if (username.trim() === '') {
            alert('Please enter your username.');
            return;
        }

        if (password.trim() === '') {
            alert('Please enter your password.');
            return;
        }

        localStorage.setItem('isLoggedIn', true);
    };

    return (
        <div className='mt-1'>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">

                {window.location.href.endsWith('/login') &&
                    <CefaloBlogLogo />
                }

                <div className="w-96 p-8 bg-white rounded shadow-lg mt-2">

                    <div className='inline-flex text-center gap-3 mb-3'>
                        <p className="text-center text-2xl">Log in to Cefalo Blog </p>

                        <img src={blogLogo} className="w-10 h-10 " alt="Cefalo Blog Logo" />
                    </div>

                    <form>
                        <div className="mb-4">
                            <label htmlFor="username" className="block font-medium mb-1">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                placeholder="Enter your username"
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block font-medium mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                placeholder="Enter your password"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
                            onClick={handleLogin}
                        >
                            Log In
                        </button>
                    </form>

                    <ForgottenPassword />

                    {!window.location.href.endsWith('/login') && <CreateNewAccountButton />}
                </div>
            </div>
        </div>
    )
}

