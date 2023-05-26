import React, { useState } from 'react'
import cefaloBlogLogo from "../../assets/logo.jpg";

import CreateNewAccountButton from './CreateNewAccountButton';

export default function Login() {

    const handleLogin = () => {
        localStorage.setItem('isLoggedIn', true);
    };

    return (
        <div className='mt-1'>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">


                <div className="w-96 p-8 bg-white rounded shadow-lg">

                    <div className='inline-flex items-center gap-3 mb-3'>
                        <p className="text-center text-2xl">Log in to Cefalo Blog </p>

                        <img src={cefaloBlogLogo} className="w-10 h-10 " alt="Cefalo Blog Logo" />
                    </div>

                    <form>
                        <div className="mb-4">
                            <label htmlFor="username" className="block font-medium mb-1">
                                Username
                            </label>
                            <input
                                type="text"
                                id="usrname"
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
                        <div className="text-center mt-4">
                            <a href="#" className="text-blue-500 hover:underline">
                                Forgotten Password?
                            </a>
                        </div>
                    </form>

                    {!window.location.href.endsWith('/login') && <CreateNewAccountButton />}
                </div>
            </div>
        </div>
    )
}

