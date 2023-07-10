import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CreateNewAccountButton from '../CreateNewAccountButton';

test('renders the create new account button', () => {
    render(
        <MemoryRouter>
            <CreateNewAccountButton />
        </MemoryRouter>
    );

    const buttonElement = screen.getByText('Create New Account');
    expect(buttonElement).toBeInTheDocument();
});

test('button redirects to the signup page', () => {
    render(
        <MemoryRouter>
            <CreateNewAccountButton />
        </MemoryRouter>
    );

    const buttonElement = screen.getByText('Create New Account');
    expect(buttonElement.getAttribute('href')).toBe('/signup');
});
