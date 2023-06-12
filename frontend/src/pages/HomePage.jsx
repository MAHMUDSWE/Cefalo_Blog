import React, { useContext, useState } from 'react'
import { useQuery } from '@tanstack/react-query';

import Navbar from '../components/nav/navbar'
import BlogList from "../components/blog/blogList.jsx"
import { BlogService } from '../services/blog.service';
import { toast } from 'react-toastify';
import WhatsOnYourMind from '../components/blog/WhatsOnYourMind';
import { AuthContext } from '../contexts/AuthContext';
import SearchBar from '../components/shared/Search';


export default function HomePage() {
    const { isLoggedIn } = useContext(AuthContext);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
    });

    const { data, isError } = useQuery({
        queryKey: ["getBlogs", pagination.page, pagination.limit],
        queryFn: async () => await BlogService.getAllBlogs(pagination),
        staleTime: 10000
    });

    if (isError) {
        toast.error("Oops! Something went wrong. Please Try Again Later.");
    }
    return (
        <div>
            <Navbar />
            <div className='mt-1 flex flex-col-reverse lg:flex-row  justify-center'>

                <div className="lg:w-1/4 p-4 ">
                    {/* <div className="sticky top-[84px]">
                        <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-6 mb-4">
                            <div className="w-32 h-32 bg-green-700 rounded-full mb-4">

                            </div>
                            <span></span>
                        </div>
                    </div> */}
                </div>

                <div className='lg:w-2/4 p-4 overflow-y-auto '>
                    {isLoggedIn && <WhatsOnYourMind />}
                    <BlogList blogs={data?.blogs} />
                </div>

                <div className='lg:w-1/4 items-center' >
                    <div className='sticky items-center top-[84px] '>
                        <SearchBar />
                    </div>
                </div>
            </div>

        </div>
    )
}