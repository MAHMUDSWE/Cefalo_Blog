import React, { createRef } from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { AuthContext } from '../../../contexts/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';
import ProfileDropDownButton from '../ProfileDropDownButton';
import ProfileDropDown from '../profileDropDown';

describe('ProfileDropDownButton', () => {

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
            <Router>
                <AuthContextWrapper>
                    <ProfileDropDownButton showDropDownCallback={() => { }} dropdownRef={() => { }} />
                </AuthContextWrapper>
            </Router>
        );
    });

    it('should render showDropDownDiv', () => {
        const { getByTestId } = render(
            <Router>
                <AuthContextWrapper>
                    <ProfileDropDownButton showDropDownCallback={() => { }} dropdownRef={() => { }} />
                </AuthContextWrapper>
            </Router>
        );
        const dropDownElement = getByTestId('profile-dropdown-btn');
        expect(dropDownElement).toBeInTheDocument();

    });

    it('should call showDropDownCallback with the correct value on toggle', () => {
        const showDropDownCallback = vitest.fn();
        const handleToggle = vitest.fn();
        const closeDropdown = vitest.fn();

        const { getByTestId } = render(
            <Router>
                <AuthContext.Provider value={{ authData }}>
                    <ProfileDropDownButton showDropDownCallback={showDropDownCallback} />
                </AuthContext.Provider>
            </Router>
        );
        const dropdownButton = getByTestId('profile-dropdown-btn');

        fireEvent.click(dropdownButton);

        waitFor(() => {
            expect(handleToggle).toHaveBeenCalledWith();
            expect(showDropDownCallback).toHaveBeenCalledWith(true);
        })

        fireEvent.click(dropdownButton);
        waitFor(() => {
            expect(handleToggle).toHaveBeenCalledWith();
            expect(showDropDownCallback).toHaveBeenCalledWith(false);
        })
    });

    it('should render Profile Dropdown on button click and closes when clicked again', () => {
        const showDropDownCallback = vitest.fn();
        const showDropDown = vitest.fn();

        const { getByTestId } = render(
            <Router>
                <AuthContextWrapper>
                    <ProfileDropDownButton showDropDownCallback={showDropDownCallback} dropdownRef={() => { }} />
                    <ProfileDropDown showDropDown={showDropDown} />
                </AuthContextWrapper>
            </Router>
        );

        const dropDownElement = getByTestId('profile-dropdown-btn');
        const profileDropDown = getByTestId('profile-dropdown');

        fireEvent.click(dropDownElement);
        waitFor(() => {
            expect(showDropDownCallback).toHaveBeenCalledWith(true);
            expect(profileDropDown).toBeInTheDocument();
        });

        fireEvent.click(dropDownElement);
        waitFor(() => {
            expect(showDropDownCallback).toHaveBeenCalledWith(false);
            expect(profileDropDown).not.toBeInTheDocument();
        })

    });


    it('should close dropdown when clicking outside the dropdown area', () => {
        const showDropDownCallback = vitest.fn();
        const showDropDown = vitest.fn();
        const handleClickOutside = vitest.fn();
        const closeDropdown = vitest.fn();

        const dropdownRef = createRef();

        const { getByTestId, container } = render(
            <Router>
                <AuthContext.Provider value={{ authData }}>
                    <div>
                        <div>Outside Content</div>
                        <ProfileDropDownButton showDropDownCallback={showDropDownCallback} dropdownRef={dropdownRef} />
                        <div ref={dropdownRef}>
                            <ProfileDropDown showDropDown={showDropDown} />
                        </div>
                    </div>
                </AuthContext.Provider>
            </Router>
        );
        const dropDownElement = getByTestId('profile-dropdown-btn');
        const profileDropDown = getByTestId('profile-dropdown');

        const outsideContent = container.querySelector('div:first-child');

        fireEvent.click(dropDownElement);
        waitFor(() => {
            expect(showDropDownCallback).toHaveBeenCalledWith(true);
            expect(profileDropDown).toBeInTheDocument();
        });

        fireEvent.click(outsideContent);
        waitFor(() => {
            expect(handleClickOutside).toHaveBeenCalledWith();
            expect(closeDropdown).toHaveBeenCalledWith();
            expect(profileDropDown).not.toBeInTheDocument();
        })
    });
});
