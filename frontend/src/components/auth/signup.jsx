import React from 'react'
import cefaloBlogLogo from "../../assets/logo.jpg";
import { Link } from 'react-router-dom';

export default function Signup() {
    return (
        <div className='mt-1'>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">

                {/* <div className='inline-flex items-center gap-4 mb-2'>
                    <img src={cefaloBlogLogo} className="w-70 h-70 " alt="Cefalo Blog Logo" />
                    <h1 className='text-blue-600 text-4xl font-bold'>Cefalo Blog</h1>

                </div> */}

                <div className="w-96 p-8 bg-white rounded shadow-lg">

                    <div className='inline-flex items-center gap-3 mb-3'>
                        <p className="text-center text-2xl">Create a New Account</p>

                        <img src={cefaloBlogLogo} className="w-10 h-10 " alt="Cefalo Blog Logo" />
                    </div>

                    <form>
                        <div className="mb-4">
                            <label htmlFor="fullname" className="block font-medium mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="fullname"
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                placeholder="Enter your full name"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block font-medium mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="username" className="block font-medium mb-1">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                placeholder="Choose a username"
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
                                placeholder="Choose a password"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded hover:bg-green-500"
                        >
                            Sign Up
                        </button>
                        <div className='text-center mt-3'>
                            <Link to="/login" className="text-blue-600 text-lg text-center hover:cursor-pointer">
                                Already have an account?
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}
