import dayjs from 'dayjs'
import React from 'react'
import { Link } from 'react-router-dom'

export default function BlogItem({ blog }) {
    return (
        <div className="container text-black max-w-4xl px-10 py-6 rounded-lg mb-2 shadow-md ">
            {/* border-b-2 border-gray-950 */}
            <div className="flex items-center justify-between">
                <Link rel="noopener noreferrer" to={`/blog/${blog.blogid}`} className="text-2xl font-bold hover:underline">{blog.title}</Link> <br />
                {/* <Link rel="noopener noreferrer" to={`/blog/${blog.blogid}`} className="px-2 py-1 font-bold rounded bg-violet-400 dark:text-gray-900">{blog.name}</Link> */}
                <span className="font-bold text-blue-900">{dayjs(blog.createdAt).format("MMMM DD, YYYY, hh:mma")}</span>

            </div>

            <div className="mt-3">
                {/* <span>Published By: {blog.name}</span> */}
                <p className="mt-2 line-clamp-3  ">{blog.content}</p>
            </div>

            <div className="flex items-center justify-between mt-4">
                <Link rel="noopener noreferrer" to={`/blog/${blog.blogid}`} className="hover:underline text-violet-400">Read Blog</Link>
                <div>
                    <Link rel="noopener noreferrer" to={`/${blog.username}`} className="flex items-center">
                        <img src="https://source.unsplash.com/50x50/?portrait" alt="avatar" className="object-cover w-10 h-10 mx-2 rounded-full dark:bg-gray-500" />
                        <span className="hover:underline text-teal-500 font-semibold text-xl">{blog.username}</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
