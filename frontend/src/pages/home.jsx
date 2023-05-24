import React from 'react'
import Navbar from '../components/shared/navbar';
import BlogList from '../components/blogList';
import BlogItem from '../components/blogItem';

function Home() {
    return (
        <div>
            <Navbar />
            <BlogList />
        </div>
    )
}
export default Home;