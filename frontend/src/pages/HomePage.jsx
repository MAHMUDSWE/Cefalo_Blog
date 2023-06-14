import React, { useContext, useState } from 'react'
import { useQuery } from '@tanstack/react-query';

import Navbar from '../components/nav/navbar'
import BlogList from "../components/blog/blogList.jsx"
import { BlogService } from '../services/blog.service';
import { toast } from 'react-toastify';
import WhatsOnYourMind from '../components/blog/WhatsOnYourMind';
import { AuthContext } from '../contexts/AuthContext';
import SearchBar from '../components/shared/Search';
import Pagination from '../components/shared/Pagination';
import CategorySection from '../components/blog/Category';


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

    const onPageChange = (page) => {
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set('page', page);
        // queryParams.set('limit', 10); 
        const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
        window.history.pushState(null, null, newUrl);

        setPagination({
            ...pagination,
            page
        })
    }

    return (
        <div>
            <Navbar />
            <div className='mt-1 flex flex-col-reverse lg:flex-row  justify-center'>

                <div className="lg:w-1/4 items-center">
                    {/* <div className='sticky items-center top-[84px] '>
                        <CategorySection />
                    </div> */}
                </div>

                <div className='lg:w-2/4 p-4 overflow-y-auto '>
                    <div>
                        {isLoggedIn && <WhatsOnYourMind />}
                        <BlogList blogs={data?.blogs} />
                    </div>
                    <Pagination
                        currentPage={data?.currentPage}
                        totalBlogs={data?.totalBlogs}
                        totalPages={data?.totalPages}
                        onPageChange={onPageChange}
                    />
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