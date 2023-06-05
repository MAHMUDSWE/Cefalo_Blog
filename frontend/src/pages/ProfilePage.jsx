import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/nav/navbar'
import { AuthContext } from '../contexts/AuthContext'
import WhatsOnYourMind from '../components/blog/WhatsOnYourMind'
import { BlogContext } from '../contexts/BlogContext';
import { BlogService } from '../services/blog.service';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import BlogList from '../components/blog/blogList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLocation, faLocationDot, faLocationPin, faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import EditProfile from '../components/user/EditProfile';

export default function ProfilePage() {

    const { authData } = useContext(AuthContext);
    const { blogData, setBlogData } = useContext(BlogContext);

    const { username } = useParams();
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
    });

    const { data, isError } = useQuery({
        queryKey: ["getBlogsByUser", pagination.page, pagination.limit],
        queryFn: async () => await BlogService.getBlogsByUser(username, pagination),
        staleTime: 0
    });
    useEffect(() => {
        if (data) {
            setBlogData(data);
        }
        if (isError) {
            toast.error("Oops! Something went wrong. Please Try Again Later.");
        }
    }, [data, isError])


    return (
        <div>
            <Navbar />
            <div className="mt-1 flex flex-col lg:flex-row  justify-center">

                <div className="lg:w-1/3 p-4 ">
                    <div className="sticky top-[84px]">
                        <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-6 mb-4">
                            <div className="w-32 h-32 bg-green-700 rounded-full mb-4">
                                <img
                                    src="https://avatars.githubusercontent.com/u/61628453?v=4"
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full"
                                />
                            </div>
                            <h2 className="text-[#1F2328] text-xl font-bold">{authData.name}</h2>
                            <span className="text-gray-500 font-semibold mb-2"># {authData.username}</span>
                            <div>
                                <EditProfile />
                            </div>
                            <span className="text-gray-500 mt-2"><FontAwesomeIcon icon={faLocationDot} /> Dhaka, Bangladesh</span>
                            <span className="text-gray-500"><FontAwesomeIcon icon={faEnvelope} /> {authData.email}</span>
                        </div>
                    </div>
                </div>

                <div className="lg:w-2/3 p-4 overflow-y-auto">
                    <div>
                        <WhatsOnYourMind />
                    </div>
                    <BlogList blogs={blogData?.blogs} />
                </div>
            </div>
        </div>

    )
}


{/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-lg font-bold mb-2">Blog Title 1</h3>
                            <p className="text-gray-500 mb-4">Published on: June 1, 2023</p>
                            <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget lorem vitae neque volutpat vestibulum. Cras blandit nunc vitae ipsum congue, eget venenatis dui vestibulum. In tristique orci vel velit accumsan efficitur. Sed vitae tincidunt nulla.</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-lg font-bold mb-2">Blog Title 2</h3>
                            <p className="text-gray-500">Published on: June 2, 2023</p>
                            <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget lorem vitae neque volutpat vestibulum. Cras blandit nunc vitae ipsum congue, eget venenatis dui vestibulum. In tristique orci vel velit accumsan efficitur. Sed vitae tincidunt nulla.</p>
                        </div>
                    </div> */}