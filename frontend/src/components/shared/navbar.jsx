import React from 'react';
import { NavLink } from 'react-router-dom';

import cefaloBlogLogo from "../../assets/logo.jpg"

function Navbar() {
    return (
        <header aria-label="Site Header" className="bg-white shadow-md">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">

                    <div className="flex-1 md:flex md:items-center md:gap-12">
                        <NavLink to="/" >
                            <img
                                src={cefaloBlogLogo}
                                className='w-253 h-53'
                                alt="Cefalo Blog Logo"
                            />
                        </NavLink>

                    </div>

                    <div className="md:flex md:items-center md:gap-12">
                        <nav aria-label="Site Nav" className="hidden md:block">
                            <ul className="flex items-center gap-6 text-sm">
                                <li>
                                    <NavLink
                                        to="/"
                                        classNameName="block py-2 pl-3 pr-4 rounded md:p-0 md:dark:text-blue-500"
                                    >
                                        Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/profile"
                                        classNameName="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                    >
                                        Profile
                                    </NavLink>
                                </li>
                            </ul>
                        </nav>

                        <div className="flex items-center gap-4">
                            <div className="hidden sm:flex sm:gap-4">
                                <a
                                    className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                                    href="/login"
                                >
                                    Login
                                </a>

                                <div className="hidden sm:flex">
                                    <a
                                        className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-blue-600"
                                        href="/signup"
                                    >
                                        Register
                                    </a>
                                </div>
                            </div>

                            <div className="block md:hidden">
                                <button
                                    className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        stroke-width="2"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                </button>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
