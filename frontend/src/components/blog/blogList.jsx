import React, { useState } from 'react';
import BlogItem from './blogItem';
import { BlogService } from '../../services/blog.service';
import { useQuery } from '@tanstack/react-query';


const BlogList = () => {
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
    });

    const { data } = useQuery({
        queryKey: ["getBlogs", pagination.page, pagination.limit],
        queryFn: async () => await BlogService.getAllBlogs(pagination),
    });
    console.log(data);
    return (
        <div className="mx-[25%] mt-1 bg=gray-50">
            <ul>
                {data?.blogs.map((blog) => (
                    <li key={blog.blogid}>
                        <BlogItem blog={blog} />
                    </li>
                ))}
            </ul>
        </div >
    );
};

export default BlogList;
