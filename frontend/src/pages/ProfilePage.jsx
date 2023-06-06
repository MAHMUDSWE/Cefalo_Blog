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
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import EditProfile from '../components/user/EditProfile';
import UserService from '../services/user.service';

export default function ProfilePage() {

    const { authData } = useContext(AuthContext);
    const { blogData, setBlogData } = useContext(BlogContext);
    const [profileData, setProfileData] = useState();

    const { username } = useParams();
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
    });

    const { data, isError } = useQuery({
        queryKey: ["getBlogsByUser", username, pagination.page, pagination.limit],
        queryFn: async () => await BlogService.getBlogsByUser(username, pagination),
        staleTime: 0
    });

    useQuery({
        queryKey: ["getUserByUsername", username],
        queryFn: async () => {
            const user = await UserService.getUserByUsername(username);
            setProfileData(user);
            return user;
        },
        staleTime: 0
    });

    useEffect(() => {
        if (data) {
            setBlogData(data);
        }
        if (isError) {
            toast.error("Oops! Something went wrong. Please Try Again Later.");
        }
    }, [data, isError, profileData])


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
                            <h2 className="text-[#1F2328] text-xl font-bold">{profileData?.name}</h2>
                            <span>{ }</span>
                            <span className="text-gray-500 font-semibold mb-2"># {profileData?.username}</span>
                            <div>
                                {(profileData?.username === authData?.username) && <EditProfile profileData={profileData} setProfileData={setProfileData} />}
                            </div>
                            <span className="text-gray-500 mt-2"><FontAwesomeIcon icon={faLocationDot} /> Dhaka, Bangladesh</span>
                            <span className="text-gray-500"><FontAwesomeIcon icon={faEnvelope} /> {profileData?.email}</span>
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