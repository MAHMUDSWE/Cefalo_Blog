import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query';

import Navbar from '../components/nav/navbar'
import BlogList from "../components/blog/blogList.jsx"
import { BlogService } from '../services/blog.service';
import { toast } from 'react-toastify';
import WhatsOnYourMind from '../components/blog/WhatsOnYourMind';

export default function HomePage() {

    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
    });

    const { data, isError } = useQuery({
        queryKey: ["getBlogs", pagination.page, pagination.limit],
        queryFn: async () => await BlogService.getAllBlogs(pagination),
    });

    if (isError) {
        toast.error("Oops! Something went wrong. Please Try Again Later.");
    }
    return (
        <div>
            <Navbar />

            <div className='mt-1 flex flex-col h-screen'>
                <WhatsOnYourMind />
                <BlogList blogs={data?.blogs} />
            </div>
        </div>
    )
}
