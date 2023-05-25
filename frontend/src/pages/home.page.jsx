import React from 'react'
import Navbar from '../components/shared/navbar'
import BlogList from "../components/blogList.jsx"
export default function HomePage() {
    return (
        <div>
            <Navbar />

            <div className='mt-1 flex flex-col h-screen'>
                <BlogList />
            </div>
        </div>
    )
}
