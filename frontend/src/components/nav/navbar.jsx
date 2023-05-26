import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { twMerge } from 'tailwind-merge'
import cefaloBlogLogo from "../../assets/logo.jpg";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHome, faPerson, faUserFriends } from '@fortawesome/free-solid-svg-icons';

import ProfileDropdown from './profileDropDown';


function Navbar() {

    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn'));
    const [userMode, setUserMode] = useState(localStorage.getItem('userMode'));

    const handleLogin = () => {
        localStorage.setItem('isLoggedIn', isLoggedIn);
    };

    return (
        <header aria-label="Site Header" className="bg-white shadow-md">

            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">

                <div className="flex h-16 items-center justify-between">
                    <div className="md:flex md:items-center md:gap-12">
                        <div classNameName="logo-div">
                            <NavLink to="/">
                                <img src={cefaloBlogLogo} classNameName="w-253 h-53" alt="Cefalo Blog Logo" />
                            </NavLink>
                        </div>
                    </div>

                    <div className="block md:hidden">
                        <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                            <FontAwesomeIcon icon={faBars} className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="hidden md:block">
                        <nav aria-label="Site Nav" className=''>
                            {(userMode || isLoggedIn) && <ul className="flex items-center gap-6 text-lg">
                                <li>
                                    <NavLink
                                        className={({ isActive }) => isActive ? "text-blue-600 bg-blue-100 text-lg px-3 py-3 rounded-md" : "text-gray-500 transition hover:bg-gray-100 text-lg px-3 py-3 rounded-md"}
                                        to="/home"
                                    >
                                        <FontAwesomeIcon icon={faHome} className="mr-2 text-lg " />
                                        Home
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        className={({ isActive }) => isActive ? "text-blue-600 bg-blue-100 text-lg px-3 py-3 rounded-md" : twMerge("text-gray-500 transition hover:bg-gray-100 text-lg px-3 py-3 rounded-md"
                                            , !isLoggedIn && 'disabled')}

                                        activeClassName="text-blue-600 bg-blue-100"
                                        to="/connects"
                                        disabled
                                    >
                                        <FontAwesomeIcon icon={faUserFriends} className="mr-2 text-lg" />
                                        Connects
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        className={({ isActive }) => isActive ? "text-blue-600 bg-blue-100 text-lg px-3 py-3 rounded-md" : twMerge("text-gray-500 transition hover:bg-gray-100 text-lg px-3 py-3 rounded-md"
                                            , !isLoggedIn && 'disabled')}
                                        activeClassName="text-blue-600 bg-blue-100"
                                        to="/profile"

                                    >
                                        <FontAwesomeIcon icon={faPerson} className="mr-2 text-lg" />
                                        Profile
                                    </NavLink>
                                </li>
                            </ul>}
                        </nav>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="sm:flex sm:gap-4">

                            {isLoggedIn ? <ProfileDropdown /> : <>
                                <NavLink
                                    className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                                    to="/login"
                                >
                                    Login
                                </NavLink>


                                <NavLink
                                    className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-blue-600"
                                    to="/signup"
                                >
                                    Register
                                </NavLink></>}
                        </div>

                    </div>

                </div>
            </div>
        </header>
    );
}

export default Navbar;
