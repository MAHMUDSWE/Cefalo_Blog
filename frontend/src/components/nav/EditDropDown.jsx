import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft, faEdit, faEllipsis, faShare, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function EditDropdown() {
    const [isOpen, setIsOpen] = useState(false);

    const handleDropdownToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative inline-block">
            <button
                className="flex items-center p-2 rounded-full hover:bg-gray-200 focus:outline-none"
                onClick={handleDropdownToggle}
            >
                {/* <svg
                    className="w-4 h-4 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                    />
                </svg> */}
                <FontAwesomeIcon icon={faEllipsis} style={{ color: "#8690a2", }} />
            </button>
            {isOpen && (
                // <div className="absolute right-0 z-10 mt-2 py-2 bg-white border border-gray-200 rounded shadow-lg">
                //     <button className="block px-4 py-2 hover:bg-gray-100">
                //         <FontAwesomeIcon icon={faShare} style={{ color: "#8690a2", }} />Share
                //     </button>
                //     <button className="block px-4 py-2 hover:bg-gray-100">Edit</button>
                //     <button className="block px-4 py-2 hover:bg-gray-100">Delete</button>
                // </div>
                <ul className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1">
                    <li>
                        <button
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left "
                            onClick={() => handleOptionClick('Account')}
                        >
                            <FontAwesomeIcon icon={faShare} className="mr-2" />
                            Share
                        </button>
                    </li>
                    <li>
                        <button
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            onClick={() => handleOptionClick('Settings')}
                        >
                            <FontAwesomeIcon icon={faEdit} className="mr-2" />  Edit
                        </button>
                    </li>
                    <li>
                        <button
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            onClick={() => handleOptionClick('Settings')}
                        >
                            <FontAwesomeIcon icon={faTrash} className="mr-2" /> Delete
                        </button>
                    </li>

                </ul>
            )}
        </div>
    );
}
