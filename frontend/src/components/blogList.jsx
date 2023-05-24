import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBlogs } from '../services/api/blog';
import BlogItem from './blogItem';


const BlogList = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {

        getBlogs()
            .then(data => setBlogs(data.blogs))
            .catch(error => console.log(error));
    }, []);

    return (
        <div className="mx-[25%] mt-1">
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
