import React, { useContext, useState } from 'react'
import { useQuery } from '@tanstack/react-query';

import Navbar from '../components/nav/navbar'
import BlogList from "../components/blog/blogList.jsx"
import { BlogService } from '../services/blog.service';
import { toast } from 'react-toastify';
import WhatsOnYourMind from '../components/blog/WhatsOnYourMind';
import { AuthContext } from '../contexts/AuthContext';
import Search from '../components/shared/Search';

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
            <div className='flex flex-col'>
                {/* <div>
                md:flex-row-reverse
                    <Search />
                </div> */}
                <div className='mt-1 flex flex-col mx-auto'>
                    {isLoggedIn && <WhatsOnYourMind />}
                    <BlogList blogs={data?.blogs} />
                </div>
            </div>
        </div>
    )
}
