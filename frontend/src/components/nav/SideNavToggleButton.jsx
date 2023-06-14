import React, { useContext, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHome, faTimes, faPenToSquare, faPerson, faL } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import ProfileDropdown from './profileDropDown';

function SideNavToggleButton() {
    const { authData, isLoggedIn } = useContext(AuthContext);
    const [userMode, setUserMode] = useState(localStorage.getItem('userMode'));
    const [showSideNav, setShowSideNav] = useState(false);

    const dropdownRef = useRef(null);
    const dropdownButtonRef = useRef(null);

    const toggleSideNav = () => {
        setShowSideNav(!showSideNav);
    };

    const closeDropdown = () => {
        setShowSideNav(false);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                !dropdownButtonRef.current.contains(event.target)
            ) {
                closeDropdown();
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    return (
        <>
            {/* {showSideNav && ( */}
            <div
                ref={dropdownRef}
                className={`fixed top-16 z-0  left-0 w-full bg-white shadow-lg transform transition-transform duration-[5000] ease-in-out
                            ${showSideNav ? 'opacity-100 translate-x-0' : 'pointer-events-none opacity-0 -translate-x-full'}`}
            >
                <div className=" bg-blue-500">

                    <div className="block ">
                        <nav aria-label="Site Nav">
                            {(userMode || isLoggedIn) && (
                                <ul className="flex flex-col justify-between items-center  ">

                                    <NavLink
                                        className='text-white text-xl w-full px-6 py-2 hover:bg-gray-100 hover:text-blue-600'
                                        to="/home"
                                    >
                                        <FontAwesomeIcon icon={faHome} className="mr-2 text-xl" />
                                        Home
                                    </NavLink>

                                    <NavLink
                                        className='text-white text-xl w-full px-6 py-2 hover:bg-gray-100 hover:text-blue-600'
                                        to="/write"
                                    >
                                        <FontAwesomeIcon icon={faPenToSquare} className="mr-2 text-xl" />
                                        Write
                                    </NavLink>

                                    <NavLink
                                        className='text-white text-xl w-full px-6 py-2 hover:bg-gray-100 hover:text-blue-600'
                                        to={`/${authData.username}`}
                                    >
                                        <FontAwesomeIcon icon={faPerson} className="mr-2 text-xl" />
                                        Profile
                                    </NavLink>

                                </ul>
                            )}
                        </nav>
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
            </div>
            {/* )} */}


            <button
                ref={dropdownButtonRef}
                className="rounded z-40 bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                onClick={toggleSideNav}
            >
                <FontAwesomeIcon icon={showSideNav ? faTimes : faBars} className="h-5 w-5 text-blue-500" />
            </button>
        </>

    );
}

export default SideNavToggleButton;
