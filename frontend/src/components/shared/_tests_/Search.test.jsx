import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import SearchBar from '../Search';

vitest.mock('@tanstack/react-query');


describe('SearchBar', () => {
    beforeEach(() => {
        vitest.clearAllMocks();

        const mockSearchResults = [
            { blogid: 1, title: 'React Blog', user: { username: 'John' } },
            { blogid: 2, title: 'JavaScript Blog', user: { username: 'Jane' } }
        ];

        useQuery.mockReturnValue({ data: mockSearchResults });
    });

    test('updates search text on input change', () => {

        render(<SearchBar />, { wrapper: MemoryRouter });

        const searchBarElement = screen.getByPlaceholderText('Search Cefalo Blog');
        fireEvent.change(searchBarElement, { target: { value: 'react' } });

        expect(searchBarElement.value).toBe('react');
    });

    test('clears search text on clear button click', () => {
        render(<SearchBar />, { wrapper: MemoryRouter });

        const searchBarElement = screen.getByPlaceholderText('Search Cefalo Blog');
        fireEvent.change(searchBarElement, { target: { value: 'react' } });

        const clearButtonElement = screen.getByTestId("clearSearch");
        fireEvent.click(clearButtonElement);

        expect(searchBarElement.value).toBe('');
    });

    test('fetches search results and displays them', async () => {
        render(<SearchBar />, { wrapper: MemoryRouter });

        const searchBarElement = screen.getByPlaceholderText('Search Cefalo Blog');
        fireEvent.change(searchBarElement, { target: { value: 'react' } });

        await waitFor(() => {
            const blogLinks = screen.getAllByRole('link');
            expect(blogLinks).toHaveLength(2);
        });
    });

    test('displays "No Results Found" message when search results are empty', async () => {
        useQuery.mockReturnValue({ data: [] });

        render(<SearchBar />, { wrapper: MemoryRouter });

        const searchBarElement = screen.getByPlaceholderText('Search Cefalo Blog');
        fireEvent.change(searchBarElement, { target: { value: 'react' } });

        await waitFor(() => {
            const noResultsMessage = screen.getByText('No Results Found');
            expect(noResultsMessage).toBeInTheDocument();
        });
    });

    test('displays "Try searching for blog, author, or keywords" message when focused and no search text', () => {
        render(<SearchBar />, { wrapper: MemoryRouter });

        const searchBarElement = screen.getByPlaceholderText('Search Cefalo Blog');
        fireEvent.focus(searchBarElement);

        const searchMessage = screen.getByText('Try searching for blog, author, or keywords');
        expect(searchMessage).toBeInTheDocument();
    });

    test('renders the SearchBar component', () => {
        render(<SearchBar />, { wrapper: MemoryRouter });

        const searchBarElement = screen.getByPlaceholderText('Search Cefalo Blog');
        fireEvent.focusOut(searchBarElement)
        expect(searchBarElement).toBeInTheDocument();
    });
})
