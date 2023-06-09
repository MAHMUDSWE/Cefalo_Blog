import dayjs from 'dayjs'
import React, { useContext, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import EditDropdown from './EditDropDown'
import { AuthContext } from '../../contexts/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBlog } from '@fortawesome/free-solid-svg-icons'


export default function BlogItem({ blog }) {
    const { authData } = useContext(AuthContext);
    const location = useLocation();
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            data-testid="blog-item"
            className="container text-black max-w-4xl px-10 py-6 rounded-lg mb-2 shadow-md ">

            <div className="flex items-center justify-between">
                <div>
                    <Link rel="noopener noreferrer" to={`/blog/${blog.blogid}`} className="text-2xl font-bold "><FontAwesomeIcon icon={faBlog} size='lg' /> {blog.title}</Link> <br />
                    <div className='relative'>
                        <span
                            className=" font-semibold text-blue-900"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            {dayjs(blog.createdAt).format("DD MMMM, YYYY")}
                        </span>
                    </div>
                    {isHovered && (
                        <span className="bg-black absolute text-white text-sm p-2 rounded-lg">
                            {dayjs(blog.createdAt).format("dddd, DD MMMM, YYYY, hh:mma")}
                        </span>
                    )}
                </div>
                {((blog.username === authData.username) && location.pathname !== "/home") && <div>
                    <EditDropdown blogid={blog.blogid} />
                </div>}
            </div>

            <div className="mt-3">
                <p className="mt-2 line-clamp-3  ">{blog.content}</p>
            </div>

            <div className="flex items-center justify-between mt-4">
                <Link rel="noopener noreferrer" to={`/blog/${blog.blogid}`} className="hover:underline text-violet-400">Read Blog</Link>
                <div>
                    <Link
                        data-testid='blog-username'
                        rel="noopener noreferrer" to={`/${blog.username}`} className="flex items-center">
                        <img src={blog.username === authData.username ? "https://avatars.githubusercontent.com/u/61628453?v=4" : "https://source.unsplash.com/50x50/?portrait"} alt="avatar" className="object-cover w-10 h-10 mx-2 rounded-full dark:bg-gray-500" />
                        <span className="hover:underline text-teal-500 font-semibold text-xl">{blog.username}</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

// https://avatars.githubusercontent.com/u/61628453?v=4