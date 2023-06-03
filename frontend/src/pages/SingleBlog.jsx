import React from 'react'
import Navbar from '../components/nav/navbar'
import { BlogService } from '../services/blog.service';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Link, useParams } from 'react-router-dom';

import dayjs from 'dayjs';


export default function SingleBlog() {

    const { blogid } = useParams();

    const { data, isError } = useQuery({
        queryKey: ["getBlogById"],
        queryFn: async () => await BlogService.getSpecificBlog(blogid),
        staleTime: 0
    });

    if (isError) {
        toast.error("Oops! Something went wrong. Please Try Again Later.");
    }

    return (
        <div>
            <Navbar />
            <div className='mt-1 flex flex-col h-screen'>
                {data && <div className="dark:bg-gray-800 dark:text-gray-100">
                    <div className="container max-w-4xl px-10 py-6 mx-auto rounded-lg shadow-sm dark:bg-gray-900">

                        <div className="flex items-center justify-between">
                            <div>
                                <span className="px-2 py-1 mb-2 font-bold rounded bg-violet-300 dark:text-gray-900 text-center">Published By {data.name}</span>
                            </div>

                            <div>
                                <span className="font-bold text-blue-900">Published: {dayjs(data.createdAt).format("MMMM DD, YYYY, hh:mma")}</span>
                            </div>
                        </div>

                        <div className="mt-3">
                            <h2 className="text-2xl font-bold">{data?.title}</h2>
                            <p className="mt-2">{data.content}</p>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                            <span className="dark:text-violet-400">Read more</span>
                            <div>
                                <div className="flex items-center">
                                    <img src="https://source.unsplash.com/50x50/?portrait" alt="avatar" className="object-cover w-10 h-10 mx-4 rounded-full dark:bg-gray-500" />
                                    <Link to={`/${data.username}`}><span className="text-teal-500 font-bold text-xl">{data.username}</span></Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>}
            </div>
        </div>
    )
}
