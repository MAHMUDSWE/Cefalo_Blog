import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import SideNav from '../SideNav';

const authData = {
    username: 'johnDoe',
};

const AuthContextWrapper = ({ children }) => (
    <AuthContext.Provider value={{ authData, isLoggedIn: true }}>
        {children}
    </AuthContext.Provider>
);

test('renders the SideNav component', () => {
    render(
        <Router>
            <AuthContextWrapper>
                <SideNav showSideNav={true} showDropDown={true} showDropDownCallback={vitest.fn()} />
            </AuthContextWrapper>
        </Router>
    );
});

test('displays the logged-in user\'s profile link', () => {
    const { getByText } = render(
        <Router>
            <AuthContextWrapper>
                <SideNav showSideNav={true} showDropDown={true} showDropDownCallback={vitest.fn()} />
            </AuthContextWrapper>
        </Router>
    );

    const profileLink = getByText('Profile');
    expect(profileLink).toBeInTheDocument();
});

test('calls the showDropDownCallback when the profile dropdown button is clicked', () => {
    const showDropDownCallback = vitest.fn();
    const { getByTestId } = render(
        <Router>
            <AuthContextWrapper>
                <SideNav showSideNav={true} showDropDown={true} showDropDownCallback={showDropDownCallback} />
            </AuthContextWrapper>
        </Router>
    );

    const dropdownButton = getByTestId("profile-dropdown")
    fireEvent.click(dropdownButton);

    waitFor(() => {
        expect(showDropDownCallback).toHaveBeenCalledTimes(1);
    })
});

test('displays the login link for logged-out user', () => {
    const { getByText } = render(
        <Router>
            <AuthContext.Provider value={{ authData: {}, isLoggedIn: false }}>
                <SideNav showSideNav={true} showDropDown={true} showDropDownCallback={vitest.fn()} />
            </AuthContext.Provider>
        </Router>
    );

    const loginLink = getByText('Login');
    expect(loginLink).toBeInTheDocument();
});

test('displays the register link for logged-out user', () => {
    const { getByText } = render(
        <Router>
            <AuthContext.Provider value={{ authData: {}, isLoggedIn: false }}>
                <SideNav showSideNav={true} showDropDown={true} showDropDownCallback={vitest.fn()} />
            </AuthContext.Provider>
        </Router>
    );

    const registerLink = getByText('Register');
    expect(registerLink).toBeInTheDocument();
});

test('does not display the profile link for logged-out user', () => {
    const { queryByText } = render(
        <Router>
            <AuthContext.Provider value={{ authData: {}, isLoggedIn: false }}>
                <SideNav showSideNav={true} showDropDown={true} showDropDownCallback={vitest.fn()} />
            </AuthContext.Provider>
        </Router>
    );

    const profileLink = queryByText('Profile');
    expect(profileLink).toBeNull();
});