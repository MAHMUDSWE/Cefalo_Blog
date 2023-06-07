import React, { useState } from 'react';

const BlogContext = React.createContext();

const BlogProvider = ({ children }) => {

    const [blogData, setBlogData] = useState({});
    const [blogid, setBlogId] = useState(null);

    return (
        <BlogContext.Provider value={{ blogData, setBlogData, blogid, setBlogId }}>
            {children}
        </BlogContext.Provider>
    );
};

export { BlogContext, BlogProvider };