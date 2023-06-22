import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import BlogForm from '../BlogForm';

describe('BlogForm', () => {
    const mockData = {
        title: 'Test Blog',
        content: 'This is a test blog content.',
    };

    const mockError = 'Invalid input';

    const mockSetError = vitest.fn();
    const mockOnSubmit = vitest.fn();
    const mockHandleSubmit = vitest.fn();

    it('should render the form with empty inputs', () => {
        const { getByTestId } = render(
            <BlogForm onSubmit={mockOnSubmit} data={null} error={null} setError={mockSetError} />
        );

        const blogForm = getByTestId('blog-form');
        expect(blogForm).toBeInTheDocument();

        const titleInput = getByTestId('title-input');
        expect(titleInput.value).toBe('');

        const contentInput = getByTestId('content-input');
        expect(contentInput.value).toBe('');
    });

    it('should render the form with the provided data', () => {
        const { getByTestId } = render(
            <BlogForm onSubmit={mockOnSubmit} data={mockData} error={null} setError={mockSetError} />
        );

        const blogForm = getByTestId('blog-form');
        expect(blogForm).toBeInTheDocument();

        const titleInput = getByTestId('title-input');
        expect(titleInput.value).toBe(mockData.title);

        const contentInput = getByTestId('content-input');
        expect(contentInput.value).toBe(mockData.content);
    });

    it('should display an error message if error prop is provided', () => {
        const { getByTestId, getByText } = render(
            <BlogForm onSubmit={mockOnSubmit} data={null} error={mockError} setError={mockSetError} />
        );

        const blogForm = getByTestId('blog-form');
        expect(blogForm).toBeInTheDocument();

        const errorShow = getByTestId('error-show');
        expect(errorShow).toBeInTheDocument();
        expect(getByText(mockError)).toBeInTheDocument();
    });

    it('should call the onSubmit function with the updated inputs when the form is submitted', () => {
        const { getByTestId, getByText } = render(
            <BlogForm onSubmit={mockOnSubmit} data={null} error={null} setError={mockSetError} />
        );

        const blogForm = getByTestId('blog-form');
        expect(blogForm).toBeInTheDocument();

        const titleInput = getByTestId('title-input');
        const contentInput = getByTestId('content-input');
        const publishButton = getByText('PUBLISH');

        fireEvent.change(titleInput, { target: { value: 'New Blog' } });
        fireEvent.change(contentInput, { target: { value: 'New blog content.' } });
        fireEvent.click(publishButton);

        expect(mockOnSubmit).toHaveBeenCalledWith({
            title: 'New Blog',
            content: 'New blog content.',
        });
    });

    it('should set the error state if there is a validation error', () => {
        const mockInvalidData = {
            title: 'Invalid Title',
            content: 'Invalid Content',
        };
        const { getByTestId, getByText } = render(
            <BlogForm onSubmit={mockOnSubmit} data={null} error={null} setError={mockSetError} />
        );

        const blogForm = getByTestId('blog-form');
        expect(blogForm).toBeInTheDocument();

        const titleInput = getByTestId('title-input');
        const contentInput = getByTestId('content-input');
        const publishButton = getByText('PUBLISH');

        fireEvent.change(titleInput, { target: { value: mockInvalidData.title } });
        fireEvent.change(contentInput, { target: { value: mockInvalidData.content } });

        fireEvent.click(publishButton);



        waitFor(() => {
            expect(mockSetError).toHaveBeenCalledWith('Invalid input data');
        })
    });

});
