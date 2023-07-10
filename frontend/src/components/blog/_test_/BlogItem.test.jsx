import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import BlogItem from '../blogItem';
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

test('renders blog item with correct title and content', () => {
    render(
        <MemoryRouter>
            <AuthContextWrapper>
                <BlogContextWrapper>
                    <BlogItem blog={blog} />
                </BlogContextWrapper>
            </AuthContextWrapper>
        </MemoryRouter>
    );

    const titleElement = screen.getByText('Sample Blog');
    const contentElement = screen.getByText('This is a sample blog content');

    expect(titleElement).toBeInTheDocument();
    expect(contentElement).toBeInTheDocument();
});

test('displays correct formatted date on hover', () => {
    render(
        <MemoryRouter>
            <AuthContextWrapper>
                <BlogContextWrapper>
                    <BlogItem blog={blog} />
                </BlogContextWrapper>
            </AuthContextWrapper>
        </MemoryRouter>
    );

    const dateElement = screen.getByText('20 June, 2023');
    expect(dateElement).toBeInTheDocument();

    fireEvent.mouseEnter(dateElement)

    const formattedDateElement = screen.getByText('Tuesday, 20 June, 2023, 12:00am');
    expect(formattedDateElement).toBeInTheDocument();
});

test('author link points to the correct username', () => {
    render(
        <MemoryRouter>
            <AuthContextWrapper>
                <BlogContextWrapper>
                    <BlogItem blog={blog} />
                </BlogContextWrapper>
            </AuthContextWrapper>
        </MemoryRouter>
    );

    const authorLink = screen.getByTestId('blog-username')
    expect(authorLink).toBeInTheDocument();
    expect(authorLink).toHaveAttribute('href', "/john")
});

test('displays correct link to read the blog', () => {

    render(
        <BrowserRouter>
            <AuthContextWrapper>
                <BlogContextWrapper>
                    <BlogItem blog={blog} />
                </BlogContextWrapper>
            </AuthContextWrapper>
        </BrowserRouter>
    );

    const expectedHref = `/blog/${blog.blogid}`;

    const readBlogLink = screen.getByText('Read Blog').closest('a');
    expect(readBlogLink).toHaveAttribute('href', expectedHref);

    fireEvent.click(readBlogLink)

    expect(window.location.href.split(':3000')[1]).toBe(expectedHref)

});


test('renders EditDropdown when username matches authenticated user and location is not "/home"', () => {

    render(
        <BrowserRouter>
            <AuthContextWrapper>
                <BlogContextWrapper>
                    <BlogItem blog={blog} />
                </BlogContextWrapper>
            </AuthContextWrapper>
        </BrowserRouter>
    );

    const editDropdown = screen.getByTestId('edit-dropdown');
    expect(editDropdown).toBeInTheDocument();
});


test('renders the correct avatar image based on username', () => {
    render(
        <BrowserRouter>
            <AuthContextWrapper>
                <BlogContextWrapper>
                    <BlogItem blog={blog} />
                </BlogContextWrapper>
            </AuthContextWrapper>
        </BrowserRouter>
    );

    const avatarImage = screen.getByAltText('avatar');
    const expectedImageSource = 'https://avatars.githubusercontent.com/u/61628453?v=4';
    expect(avatarImage).toHaveAttribute('src', expectedImageSource);
});