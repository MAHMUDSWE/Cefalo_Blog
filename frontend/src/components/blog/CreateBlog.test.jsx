import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Await, MemoryRouter, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import CreateBlog from './CreateBlog';
import { AuthContext } from '../../contexts/AuthContext';

vitest.mock('@tanstack/react-query')
vitest.mock('react-toastify');

const authData = {
    name: "mahmudur rahman"
}

const AuthContextWrapper = ({ children }) => (
    <AuthContext.Provider value={{ authData, isLoggedIn: true }}>
        {children}
    </AuthContext.Provider>
);

describe('CreateBlog', () => {
    const onClose = vitest.fn();

    beforeEach(() => {
        vitest.clearAllMocks();
    });

    test('renders create blog form with correct heading', () => {
        render(
            <MemoryRouter>
                <AuthContextWrapper>
                    <CreateBlog onClose={onClose} />
                </AuthContextWrapper>
            </MemoryRouter>
        );

        const headingElement = screen.getByText('Create Blog');
        expect(headingElement).toBeInTheDocument();
    });

    test('renders blog form ', () => {
        render(
            <MemoryRouter>
                <AuthContextWrapper>
                    <CreateBlog onClose={onClose} />
                </AuthContextWrapper>
            </MemoryRouter>
        );

        const blogform = screen.getByTestId('blog-form');
        expect(blogform).toBeInTheDocument();
    });

    test('calls blogCreateMutation on form submit and triggers success flow', async () => {
        const mockMutateAsync = vitest.fn();
        const mockInvalidateQueries = vitest.fn();

        useMutation.mockReturnValue({
            mutateAsync: mockMutateAsync,
            onSuccess: (data) => {
                mockInvalidateQueries(['getBlogsByUser', authData.username, 1, 10]);
            },
        });

        render(
            <MemoryRouter>
                <AuthContextWrapper>
                    <CreateBlog onClose={onClose} />
                </AuthContextWrapper>
            </MemoryRouter>
        );

        const formElement = screen.getByTestId('blog-form')
        fireEvent.submit(formElement);


        await waitFor(() => {
            expect(mockMutateAsync).toHaveBeenCalledTimes(1);
            expect(mockMutateAsync).toHaveBeenCalledWith(expect.any(Object));
        })

        waitFor(() => {
            expect(mockInvalidateQueries).toHaveBeenCalledTimes(1);
        })
    });
    test('calls blogCreateMutation on form submit and triggers error flow', async () => {
        const mockMutateAsync = vitest.fn();
        const mockError = vitest.fn();

        useMutation.mockReturnValue({
            mutateAsync: mockMutateAsync,
            onError: mockError()
        });

        render(
            <MemoryRouter>
                <AuthContextWrapper>
                    <CreateBlog onClose={onClose} />
                </AuthContextWrapper>
            </MemoryRouter>
        );

        const formElement = screen.getByTestId('blog-form')
        fireEvent.submit(formElement);


        await waitFor(() => {
            expect(mockMutateAsync).toHaveBeenCalledTimes(1);
            expect(mockMutateAsync).toHaveBeenCalledWith(expect.any(Object));
            expect(mockError).toHaveBeenCalledTimes(1);
        })
    });
});
