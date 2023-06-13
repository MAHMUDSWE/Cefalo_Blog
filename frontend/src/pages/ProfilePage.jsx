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
import SearchBar from '../components/shared/Search';
import Pagination from '../components/shared/Pagination';

export default function ProfilePage() {
    const { username } = useParams();
    const { authData } = useContext(AuthContext);
    const { blogData, setBlogData } = useContext(BlogContext);
    const [profileData, setProfileData] = useState();

    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
    });

    const { data: blogs, isError: isBlogsError } = useQuery({
        queryKey: ['getBlogsByUser', username, pagination.page, pagination.limit],
        queryFn: async () => await BlogService.getBlogsByUser(username, pagination),
        staleTime: 10000
    });

    const { data: user, isError: isUserError } = useQuery({
        queryKey: ['getUserByUsername', username],
        queryFn: async () => await UserService.getUserByUsername(username),
        staleTime: 10000
    });

    useEffect(() => {
        console.log(blogData);

        const blogs = blogData;
        setBlogData(blogs);
    }, [blogData]);

    useEffect(() => {
        if (blogs) {
            setBlogData(blogs);
        }
        if (isBlogsError || isUserError) {
            toast.error('Oops! Something went wrong. Please try again later.');
        }
    }, [blogs, isBlogsError, isUserError]);



    useEffect(() => {
        if (user) {
            setProfileData(user);
        }
    }, [user]);

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
            <div className="mt-1 flex flex-col lg:flex-row  justify-center">

                <div className="lg:w-1/4 p-4 ">
                    <div className="sticky top-[84px]">
                        <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-6 mb-4">
                            <div className="w-32 h-32 bg-green-700 rounded-full mb-4">
                                <img
                                    src={profileData?.username === authData?.username ? "https://avatars.githubusercontent.com/u/61628453?v=4" : "https://source.unsplash.com/50x50/?portrait"}
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

                <div className="lg:w-2/4 p-4  overflow-y-auto">
                    <div>
                        <WhatsOnYourMind />
                    </div>
                    <div>
                        {blogData?.blogs ?
                            (<BlogList blogs={blogData?.blogs} />)
                            : (<div className='font-semibold text-lg text-center'>
                                <h1>Not Posted Yet</h1>
                            </div>)}
                    </div>
                    <Pagination
                        currentPage={blogData?.currentPage}
                        totalBlogs={blogData?.totalBlogs}
                        totalPages={blogData?.totalPages}
                        onPageChange={onPageChange}
                    />
                </div>

                <div className='lg:w-1/4  items-center' >
                    <div className='sticky items-center top-[84px] '>
                        <SearchBar />
                    </div>
                </div>
            </div>
        </div>

    )
}