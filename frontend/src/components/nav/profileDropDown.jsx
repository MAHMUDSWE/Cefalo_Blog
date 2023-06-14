import React, { useContext, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faCog, faUser, faGreaterThan, faLessThan } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';


import { removeAccessToken } from '../../utils/token.util';
import { toast } from 'react-toastify';
import Logout from '../auth/Logout';


function ProfileDropdown() {
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const dropdownButtonRef = useRef(null);
    const { authData, setAuthData, setIsLoggedIn } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    const handleOptionClick = (option) => {
        console.log(`Selected option: ${option}`);

        if (option === "Logout") {
            // setIsLoggedIn(false);
            // setAuthData({});
            // removeAccessToken();
            // toast.success("Logout successful! See you again soon.");
            // navigate('/')
        }
    };

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
        <div className="relative text-lg  lg:rounded text-white lg:text-blue-600 hover:text-blue-600 hover:bg-gray-100">
            <div
                type="button"
                ref={dropdownButtonRef}
                className="w-full flex py-3 px-5 items-center focus:outline-none hover:cursor-pointer"
                onClick={handleToggle}
            >
                <div>
                    <span className="mr-4 font-bold ">{authData.username}</span>
                </div>
                <div>
                    <img
                        src="https://avatars.githubusercontent.com/u/61628453?v=4"
                        alt="Profile"
                        className="w-8 h-8 rounded-full"
                    />
                </div>
                <div className='ml-10'>
                    <FontAwesomeIcon
                        icon={isOpen ? faLessThan : faGreaterThan}
                        rotation={90}
                    />
                </div>
            </div>

            {isOpen && (
                <ul ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                    <li>
                        <button
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left "
                            onClick={() => handleOptionClick('Account')}
                        >
                            <FontAwesomeIcon icon={faUser} className="mr-2" />
                            Account
                        </button>
                    </li>
                    <li>
                        <button
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            onClick={() => handleOptionClick('Settings')}
                        >
                            <FontAwesomeIcon icon={faCog} className="mr-2" />
                            Settings
                        </button>
                    </li>
                    <li>
                        <Logout />
                    </li>

                </ul>
            )}
        </div>
    );
}

export default ProfileDropdown;
