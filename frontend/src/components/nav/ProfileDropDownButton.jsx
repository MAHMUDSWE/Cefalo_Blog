import React, { useContext, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faUser, faGreaterThan, faLessThan } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../contexts/AuthContext';
import ProfileDropDown from './profileDropDown';


function ProfileDropDownButton({ showDropDownCallback, dropdownRef }) {
    // const dropdownRef = useRef(null);
    const dropdownButtonRef = useRef(null);
    const { authData } = useContext(AuthContext);
    const [showDropDown, setShowDropDown] = useState(false);

    const handleToggle = () => {
        setShowDropDown(prevValue => !prevValue);
    };

    const closeDropdown = () => {
        setShowDropDown(false);
    }
    useEffect(() => {
        showDropDownCallback(showDropDown);
    }, [showDropDown])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef?.current &&
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
        <div className="text-lg  lg:rounded text-white lg:text-blue-600 ">
            <div
                type="button"
                ref={dropdownButtonRef}
                className="w-full z-10 lg:border-2 flex py-2 px-5 items-center focus:outline-none hover:cursor-pointer"
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
                        icon={showDropDown ? faLessThan : faGreaterThan}
                        rotation={90}
                        size='sm'
                    />
                </div>
            </div>

            {/* <ProfileDropDown showDropDown={showDropDown} /> */}
        </div>
    );
}

export default ProfileDropDownButton;
