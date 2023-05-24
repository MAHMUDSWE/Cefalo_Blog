import axios from 'axios';

export const getBlogs = async () => {
    try {
        const response = await axios.get('https://cefalo-blog.onrender.com/api/v1/blog');
        return response.data;
    } catch (error) {
        console.error('Error fetching blogs:', error);
        throw error;
    }
};
