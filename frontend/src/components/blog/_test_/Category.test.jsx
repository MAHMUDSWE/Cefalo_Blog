import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CategorySection from '../Category';

test('renders category section with correct heading', () => {
    render(
        <MemoryRouter>
            <CategorySection />
        </MemoryRouter>
    );

    const headingElement = screen.getByText('Categories');
    expect(headingElement).toBeInTheDocument();
});

test('renders category links with correct text and URLs', () => {
    render(
        <MemoryRouter>
            <CategorySection />
        </MemoryRouter>
    );

    const categories = ['Technology', 'Travel', 'Food', 'Fashion', 'Sports'];

    categories.forEach((category) => {
        const categoryLink = screen.getByText(category);
        expect(categoryLink).toBeInTheDocument();

        const expectedURL = `/category/${category}`;
        expect(categoryLink).toHaveAttribute('href', expectedURL);
    });
});
