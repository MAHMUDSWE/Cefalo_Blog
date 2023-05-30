import React, { useEffect, useState } from 'react';
import { BlogService } from '../../services/blog.service';
import BlogItem from './blogItem';


const BlogList = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {

        BlogService.getAllBlogs()
            .then(data => setBlogs(data.blogs))
            .catch(error => console.log(error));
    }, []);

    return (
        <div className="mx-[25%] mt-1 bg=gray-50">
            <ul>
                {blogs.map((blog) => (
                    <li key={blog.blogid}>
                        <BlogItem blog={blog} />
                    </li>
                ))}
            </ul>
        </div >
    );
};

export default BlogList;
