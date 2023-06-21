import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ForgottenPassword from '../ForgottenPassword';

describe('ForgottenPassword', () => {
    it('should render the Forgotten Password link', () => {
        const { getByText } = render(
            <MemoryRouter>
                <ForgottenPassword />
            </MemoryRouter>
        );

        const forgottenPasswordLink = getByText('Forgotten Password?');
        expect(forgottenPasswordLink).toBeInTheDocument();
    });

    it('should have the correct route path', () => {
        const { getByText } = render(
            <MemoryRouter>
                <ForgottenPassword />
            </MemoryRouter>
        );

        const forgottenPasswordLink = getByText('Forgotten Password?');
        expect(forgottenPasswordLink).toHaveAttribute('href', '/recover');
    });
});
