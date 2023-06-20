import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import ProfileDropDown from '../profileDropDown';

const authData = {
    username: 'johnDoe',
};

const AuthContextWrapper = ({ children }) => (
    <AuthContext.Provider value={{ authData, isLoggedIn: true }}>
        {children}
    </AuthContext.Provider>
);

test('calls the handleOptionClick function with "Account" when the account option is clicked', () => {
    const handleOptionClick = vitest.fn();

    const { getByText } = render(
        <Router>
            <AuthContextWrapper>
                <ProfileDropDown showDropDown={true} />
            </AuthContextWrapper>
        </Router>
    );

    const option = getByText('Account');
    fireEvent.click(option);

    waitFor(() => {
        expect(handleOptionClick).toHaveBeenCalledWith('Account');
    });
});

test('calls the handleOptionClick function with "Settings" when the settings option is clicked', () => {
    const handleOptionClick = vitest.fn();

    const { getByText } = render(
        <Router>
            <AuthContextWrapper>
                <ProfileDropDown showDropDown={true} />
            </AuthContextWrapper>
        </Router>
    );

    const option = getByText('Settings');
    fireEvent.click(option);

    waitFor(() => {
        expect(handleOptionClick).toHaveBeenCalledWith('Settings');
    });
});


