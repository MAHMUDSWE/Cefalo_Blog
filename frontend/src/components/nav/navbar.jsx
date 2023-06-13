import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { twMerge } from 'tailwind-merge'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHome, faPerson, faUserFriends, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

import CefaloBlogLogo from '../shared/CefaloBlogLogo';
import { AuthContext } from '../../contexts/AuthContext';
import ProfileDropdown from './profileDropDown';
import SideNavToggleButton from './SideNavToggleButton';


function Navbar() {

    const { authData, isLoggedIn } = useContext(AuthContext);
    const [userMode, setUserMode] = useState(localStorage.getItem('userMode'));

    return (
        <header aria-label="Site Header" className="bg-white shadow-md sticky top-0 z-10">

            <div className=" px-4 sm:px-6 lg:px-8">

                <div className="flex h-16 items-center justify-between">

                    <div className=" lg:w-1/3 flex items-center">
                        <CefaloBlogLogo />
                    </div>

                    <div className="lg:w-1/3 hidden lg:block">
                        <nav aria-label="Site Nav" className=''>
                            {(userMode || isLoggedIn) && <ul className="flex justify-center items-center gap-4 text-lg">
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

                                        to="/write"
                                        disabled
                                    >
                                        <FontAwesomeIcon icon={faPenToSquare} className="mr-2 text-lg" />
                                        Write
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        className={({ isActive }) => isActive ? "text-blue-600 bg-blue-100 text-lg px-3 py-3 rounded-md" : twMerge("text-gray-500 transition hover:bg-gray-100 text-lg px-3 py-3 rounded-md"
                                            , !isLoggedIn && 'disabled')}
                                        to={`/${authData.username}`}

                                    >
                                        <FontAwesomeIcon icon={faPerson} className="mr-2 text-lg" />
                                        Profile
                                    </NavLink>
                                </li>
                            </ul>}
                        </nav>
                    </div>

                    <div className="lg:w-1/3  hidden gap-4 lg:block">
                        <div className="sm:flex justify-end sm:gap-4">

                            {isLoggedIn ?
                                <ProfileDropdown />
                                :
                                <>
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
                                    </NavLink>
                                </>
                            }
                        </div>
                    </div>

                    <div className="block lg:hidden">
                        <SideNavToggleButton />
                    </div>

                </div>
            </div>
        </header>
    );
}

export default Navbar;
