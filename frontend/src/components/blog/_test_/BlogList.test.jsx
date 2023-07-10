import React from 'react';
import { render, screen } from '@testing-library/react';
import BlogList from '../blogList';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import { BlogContext } from '../../../contexts/BlogContext';

const authData = {
    name: "mahmudur rahman",
    username: "john"
}

const blog = {
    blogid: 1,
    title: 'Sample Blog',
    content: 'This is a sample blog content',
    createdAt: '2023-06-20',
    username: 'john',
};

const AuthContextWrapper = ({ children }) => (
    <AuthContext.Provider value={{ authData, isLoggedIn: true }}>
        {children}
    </AuthContext.Provider>
);

const BlogContextWrapper = ({ children }) => (
    <BlogContext.Provider value={{ blogid: vitest.fn(), setBlogId: vitest.fn() }}>
        {children}
    </BlogContext.Provider>
)
test('renders a list of blog items', () => {
    const blogs = [
        {
            blogid: 1,
            title: 'Sample Blog 1',
            content: 'This is a sample blog content 1',
            createdAt: '2023-06-20',
            username: 'john',
        },
        {
            blogid: 2,
            title: 'Sample Blog 2',
            content: 'This is a sample blog content 2',
            createdAt: '2023-06-21',
            username: 'jane',
        },
    ];

    render(
        <MemoryRouter>
            <AuthContextWrapper>
                <BlogContextWrapper>
                    <BlogList blogs={blogs} />
                </BlogContextWrapper>
            </AuthContextWrapper>
        </MemoryRouter>);


    const blogItems = screen.getAllByTestId('blog-item');

    expect(blogItems).toHaveLength(blogs.length);
});
