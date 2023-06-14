import React, { useContext, useEffect } from 'react'
import Navbar from '../components/nav/navbar'
import { BlogService } from '../services/blog.service';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Link, useParams } from 'react-router-dom';

import dayjs from 'dayjs';
import EditDropdown from '../components/blog/EditDropDown';
import { AuthContext } from '../contexts/AuthContext';


export default function SingleBlog() {
    const { authData } = useContext(AuthContext);
    const { blogid } = useParams();

    const { data, isError } = useQuery({
        queryKey: ["getBlogById", blogid],
        queryFn: async () => await BlogService.getSpecificBlog(blogid),
        staleTime: 30000
    });

    useEffect(() => {
        if (isError) {
            toast.error("Oops! Something went wrong. Please Try Again Later.");
        }
    }, [isError])

    return (
        <div>
            <Navbar />
            <div className='mt-1 flex flex-col'>
                {data && <div className="text-black-100">
                    <div className="container max-w-4xl px-10 py-6 mx-auto rounded-lg shadow-sm ">

                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-blue-950 text-4xl font-bold ">{data?.title}</h2>
                            </div>

                            {(data.username === authData.username) && <div>
                                <EditDropdown blogid={data.blogid} />
                            </div>}
                        </div>


                        <div className="border-t-2 border-b-2 mt-4 py-4 border-gray-900">

                            <div className="flex-col sm:flex sm:flex-row items-center justify-between">
                                <div>
                                    <span className="px-2 py-1 mb-2 font-bold rounded bg-violet-300 dark:text-gray-900 text-center">Published By {data.name}</span>
                                </div>

                                <div className='flex-col sm:text-right'>
                                    {(data.createdAt !== data.updatedAt) &&
                                        <div><span className="hidden sm:block text-md font-bold text-blue-950">Updated On: {dayjs(data.createdAt).format("MMMM DD, YYYY")}</span> </div>}
                                    <div><span className="px-2 text-sm font-semibold text-gray-500">Published: {dayjs(data.createdAt).format("MMMM DD, YYYY")}</span></div>
                                </div>
                            </div>
                        </div>


                        <div className="mt-4">
                            <p className="mt-2">{data.content}</p>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                            {/* <span className="text-violet-400">Read more</span> */}
                            <span></span>
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
