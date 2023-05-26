import React from 'react'

export default function Signup() {
    return (
        <div className='mt-1'>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <div className="w-96 p-8 bg-white rounded shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">Create a New Account</h2>
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
                    </form>
                </div>
            </div>
        </div>

    )
}
