import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faCog, faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';


function ProfileDropdown() {
    const navigate = useNavigate();
    const { authData, setAuthData, setIsLoggedIn } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        console.log(`Selected option: ${option}`);

        if (option === "Logout") {
            localStorage.removeItem("access_token");
            setIsLoggedIn(false);
            setAuthData({});

            navigate('/')
        }
    };

    return (
        <div className="relative hover:bg-gray-100 text-lg px-3 py-3 rounded">
            <button
                type="button"
                className="flex items-center focus:outline-none"
                onClick={handleToggle}
            >
                <span className="mr-4 font-bold text-blue-600">{authData.username}</span>
                <img
                    src="https://avatars.githubusercontent.com/u/61628453?v=4"
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                />
            </button>

            {isOpen && (
                <ul className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
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
                        <button
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            onClick={() => handleOptionClick('Logout')}
                        >
                            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                            Logout
                        </button>
                    </li>

                </ul>
            )}
        </div>
    );
}

export default ProfileDropdown;
