import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { AuthContext } from '../../../contexts/AuthContext';
import { Link, MemoryRouter } from 'react-router-dom';
import Navbar from '../navbar';
import SideNav from '../SideNav';

describe('Navbar', () => {
    const authData = {
        username: 'johnDoe',
    };

    const AuthContextWrapper = ({ children }) => (
        <AuthContext.Provider value={{ authData, isLoggedIn: true }}>
            {children}
        </AuthContext.Provider>
    );

    it('should render without errors', () => {
        render(
            <MemoryRouter>
                <AuthContextWrapper>
                    <Navbar />
                </AuthContextWrapper>
            </MemoryRouter>
        );
    });

    it('should show logged-out section when not logged in', () => {
        const AuthContextWrapper1 = ({ children }) => (
            <AuthContext.Provider value={{ authData, isLoggedIn: false }}>
                {children}
            </AuthContext.Provider>
        );
        render(
            <MemoryRouter>
                <AuthContextWrapper1>
                    <Navbar />
                    <SideNav showDropDown={false} showSideNav={false} showDropDownCallback={() => { }} />
                </AuthContextWrapper1>
            </MemoryRouter>
        );

        const navigationLinks = screen.getAllByRole('link');
        const expectedPaths = ['/home', '/login', '/signup'];

        const uniqueHrefs = Array.from(new Set(navigationLinks.map(link => '/' + link.href.split('/')[3])));


        expectedPaths.forEach((path) => {
            expect(uniqueHrefs).toContain(path)
        })

    });

    it('should show the correct navigation links when logged in', () => {
        render(
            <MemoryRouter>
                <AuthContextWrapper>
                    <Navbar />
                    <SideNav showDropDown={false} showSideNav={false} showDropDownCallback={() => { }} />
                </AuthContextWrapper>
            </MemoryRouter>
        );

        const navigationLinks = screen.getAllByRole('link');

        const expectedPaths = ['/home', '/write', `/${authData.username}`];

        const uniqueHrefs = Array.from(new Set(navigationLinks.map(link => '/' + link.href.split('/')[3])));


        expectedPaths.forEach((path) => {
            expect(uniqueHrefs).toContain(path)
        })
    });

    it('should toggle side navigation on button click', () => {
        const { getByTestId } = render(
            <MemoryRouter>
                <AuthContextWrapper>
                    <Navbar />
                </AuthContextWrapper>
            </MemoryRouter>
        );

        const toggleButton = getByTestId('sidenav-toggle-button');

        fireEvent.click(toggleButton);
    });

});
