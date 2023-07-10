import React, { useState } from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { AuthContext } from '../../../contexts/AuthContext';
import Logout from '../Logout';
import { MemoryRouter } from 'react-router-dom';

describe('Logout', () => {
    const authData = {
        name: "mahmudur rahman"
    }
    const setIsLoggedInMock = vitest.fn();
    const setAuthDataMock = vitest.fn();

    const AuthContextWrapper = ({ children }) => (

        <AuthContext.Provider value={{ authData, setAuthData: setAuthDataMock, setIsLoggedIn: setIsLoggedInMock, isLoggedIn: true }}>
            {children}
        </AuthContext.Provider>
    );

    it('should handle logout', async () => {
        const handleLogoutMock = vitest.fn();

        const { getByTestId } = render(
            <MemoryRouter>
                <AuthContextWrapper>
                    <Logout />
                </AuthContextWrapper>
            </MemoryRouter>
        );

        const logout = getByTestId('logout-button')
        expect(logout).toBeInTheDocument();

        fireEvent.click(logout);

        waitFor(() => {
            expect(handleLogoutMock).toBeCalled();
            console.log("hello")
            expect(setIsLoggedInMock).toBeCalledWith(false);
            console.log(window.location.href);
            expect(window.location.href).toBe('/')
        })
    });
});
