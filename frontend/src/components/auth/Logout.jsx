import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { removeAccessToken } from '../../utils/token.util';

export default function Logout() {
    const navigate = useNavigate();
    const { setAuthData, setIsLoggedIn } = useContext(AuthContext);

    const handleLogout = () => {
        setIsLoggedIn(false);
        setAuthData({});
        removeAccessToken();
        toast.success("Logout successful! See you again soon.");
        navigate('/')
    }

    return (

        <li className="w-full text-xl  px-6 py-2 text-gray-700 hover:text-blue-500 ">
            <div
                className='hover:cursor-pointer'

                onClick={handleLogout}
            >
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                Logout
            </div>
        </li>
        // <button
        //     className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-500 w-full text-left"
        //     onClick={handleLogout}
        // >
        //     <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
        //     Logout
        // </button>
    )
}
