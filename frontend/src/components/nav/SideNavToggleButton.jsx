import React, { useContext, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHome, faTimes, faPenToSquare, faPerson, faL, faUser, faRightFromBracket, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import ProfileDropdown from './profileDropDown';

function LoggedOutSection() {

    return (
        <ul>
            <li className='gap-1 border-b-2 border-blue-200'>
                <NavLink
                    to="/login"
                >
                    <div className=' text-white text-xl  px-6 py-2'>
                        <FontAwesomeIcon icon={faRightToBracket} className="mr-2" />
                        Login
                    </div>
                </NavLink>
            </li>
            <li className='gap-1 border-b-2 border-blue-200'>
                <NavLink
                    to="/signup"
                >
                    <div className='bg-gray-100 text-blue-600 text-xl  px-6 py-2 hover:bg-blue-400'>
                        <FontAwesomeIcon icon={faUser} className="mr-2" />
                        Register
                    </div>
                </NavLink>
            </li>
        </ul>
    )
}

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
                                // className="flex flex-col justify-between items-center  "
                                <ul >
                                    <li className='gap-1 border-b-2 border-blue-200'>
                                        <NavLink
                                            to="/home"
                                        >
                                            <div className=' text-white text-xl  px-6 py-2 hover:bg-blue-400'>
                                                <FontAwesomeIcon icon={faHome} className="mr-2" />
                                                Home
                                            </div>
                                        </NavLink>
                                    </li>

                                    <li className='gap-1 border-b-2 border-blue-200'>
                                        <NavLink
                                            to="/write"
                                        >
                                            <div className=' text-white text-xl  px-6 py-2 hover:bg-blue-400'>
                                                <FontAwesomeIcon icon={faPenToSquare} className="mr-2" />
                                                Write
                                            </div>
                                        </NavLink>
                                    </li>

                                    <li className='gap-1 border-b-2 border-blue-200'>
                                        <NavLink
                                            to={`/${authData.username}`}
                                        >
                                            <div className=' text-white text-xl  px-6 py-2 hover:bg-blue-400'>
                                                <FontAwesomeIcon icon={faUser} className="mr-2" />
                                                Profile
                                            </div>
                                        </NavLink>
                                    </li>
                                </ul>
                            )}
                        </nav>
                        {isLoggedIn ?
                            <ProfileDropdown />
                            :
                            <LoggedOutSection />
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
