import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@tanstack/react-query';
import UserService from '../../services/user.service';

export default function SearchBar() {
    const [searchText, setSearchText] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef(null);
    const [searchResults, setSearchResult] = useState([]);

    // const { data: user } = useQuery({
    //     enabled: !!searchText,
    //     queryKey: ['getUserByUsername', searchText],
    //     queryFn: async () => await UserService.getUserByUsername(searchText),
    //     staleTime: 60000
    // });

    // useEffect(() => {
    //     if (user) {
    //         setSearchResult(user);
    //     }
    // }, [user]);

    const handleInputChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleClearSearch = () => {
        setSearchText('');
        inputRef.current.focus();
    };

    return (
        <div className="container max-w-4xl px-4 py-4 flex-col justify-center rounded-full">
            <div
                className={`flex items-center rounded-full gap-2 px-6 py-3 transition duration-300 ${isFocused
                    ? 'bg-white border border-blue-400 shadow'
                    : 'bg-[#EFF3F4]'
                    }`}
            >
                <FontAwesomeIcon
                    icon={faSearch}
                    className={`mr-2 ${isFocused ? 'text-blue-400' : 'text-gray-500'}`}
                />

                <input
                    type="text"
                    placeholder="Search Cefalo Blog"
                    value={searchText}
                    onChange={handleInputChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    ref={inputRef}
                    className="outline-none bg-transparent flex-grow"
                />
                {(searchText) && (
                    <button onClick={handleClearSearch} className=' w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center'>
                        <FontAwesomeIcon
                            icon={faTimes}
                            className="text-white cursor-pointer"
                        />
                    </button>
                )}
            </div>

            {(isFocused && searchText.length > 0) && (
                <div className="mt-4">
                    {console.log(searchResults)}
                </div>
            )}

            {(isFocused && searchText.length <= 0) && (
                <div className=" px-8 py-4 z-10 shadow-md rounded-md">
                    Try searching for people, topics, or keywords
                </div>
            )}
        </div>
    );
}
