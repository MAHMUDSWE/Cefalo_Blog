import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import EditProfile from '../EditProfile';
import { useMutation } from '@tanstack/react-query';

vitest.mock('@tanstack/react-query');


describe('EditProfile', () => {
    const authData = {
        name: "mahmudur rahman"
    }
    const mockProfileData = {
        username: "mahmudswe",
        name: "Mahmudur Rahman"
    };

    const AuthContextWrapper = ({ children }) => (
        <AuthContext.Provider value={{ authData, isLoggedIn: true }}>
            {children}
        </AuthContext.Provider>
    );
    beforeEach(() => {
        vitest.clearAllMocks();

        useMutation.mockReturnValue({ data: mockProfileData });
    });


    test('renders EditProfile component without errors', () => {
        render(
            <MemoryRouter>
                <AuthContextWrapper>
                    <EditProfile profileData={mockProfileData} setProfileData={vitest.fn()} />
                </AuthContextWrapper>
            </MemoryRouter>
        );

        const editProfileDiv = screen.getByTestId('edit-profile');
        expect(editProfileDiv).toBeInTheDocument();

        const editProfileButton = screen.getByRole('button');
        expect(editProfileButton).toBeInTheDocument();
    });

    test('renders EditProfileForm component on button click and gets hidden', () => {
        const handleEditButtonClick = vitest.fn();
        render(
            <MemoryRouter>
                <AuthContextWrapper>
                    <EditProfile profileData={mockProfileData} setProfileData={vitest.fn()} />
                </AuthContextWrapper>
            </MemoryRouter>
        );

        const editProfileButton = screen.getByRole('button');

        fireEvent.click(editProfileButton);
        waitFor(() => {
            expect(handleEditButtonClick).toHaveBeenCalledWith();
        })
        expect(editProfileButton).not.toBeInTheDocument();

        const editProfileForm = screen.getByTestId('edit-profile-form')
        expect(editProfileForm).toBeInTheDocument()
    });

    test('submitting the form calls the updateUserByUsername function', async () => {
        const updateUserByUsernameMock = vitest.fn();
        const setAuthDataMock = vitest.fn();
        const setProfileDataMock = vitest.fn();
        const onSubmit = vitest.fn();
        const navigateMock = vitest.fn();

        const mockResponseData = {
            username: "mahmudswe",
            name: "Mahmudur Rahman Sardar"
        }

        const mockUpdatedUserData = {
            name: "Mahmudur Rahman Sardar"
        }
        useMutation.mockReturnValue({
            mutateAsync: updateUserByUsernameMock,
            onSuccess: (mockResponseData) => {
                setProfileDataMock(mockResponseData);
                setProfileDataMock(mockResponseData)
            }
        });

        const { getByText } = render(
            <MemoryRouter>
                <AuthContextWrapper>
                    <EditProfile
                        profileData={mockProfileData}
                        setProfileData={setProfileDataMock}
                    />
                </AuthContextWrapper>
            </MemoryRouter>
        );

        const editProfileButton = getByText('Edit Profile');
        fireEvent.click(editProfileButton);
        expect(editProfileButton).not.toBeInTheDocument();

        const submitButton = getByText('SAVE');
        fireEvent.click(submitButton);

        waitFor(() => {
            expect(onSubmit).toHaveBeenCalledWith(mockProfileData.username);

            expect(updateUserByUsernameMock).toHaveBeenCalledWith({
                username: mockProfileData.username,
                updatedUserData: mockUpdatedUserData,
            });

            expect(setAuthDataMock).toHaveBeenCalledWith(mockResponseData);
            expect(setProfileDataMock).toHaveBeenCalledWith(mockResponseData);
            expect(navigateMock).toHaveBeenCalledWith(`/${mockProfileData.username}`);
        })

    });
})

