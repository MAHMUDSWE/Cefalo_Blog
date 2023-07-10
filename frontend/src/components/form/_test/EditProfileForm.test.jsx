import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import EditProfileForm from '../EditProfileForm';

describe('EditProfileForm', () => {
    const mockProfileData = {
        name: 'John Doe',
    };

    const mockError = 'Invalid input';

    const mockSetError = vitest.fn();
    const mockOnSubmit = vitest.fn();

    it('should render the form with the provided profile data', () => {
        const { getByTestId } = render(
            <EditProfileForm
                onSubmit={mockOnSubmit}
                profileData={mockProfileData}
                error={null}
                setError={mockSetError}
            />
        );

        const editProfileForm = getByTestId('edit-profile-form');
        expect(editProfileForm).toBeInTheDocument();

        const nameInput = getByTestId('name-input');
        expect(nameInput.value).toBe(mockProfileData.name);
    });

    it('should display an error message if error prop is provided', () => {
        const { getByTestId, getByText } = render(
            <EditProfileForm
                onSubmit={mockOnSubmit}
                profileData={mockProfileData}
                error={mockError}
                setError={mockSetError}
            />
        );

        const editProfileForm = getByTestId('edit-profile-form');
        expect(editProfileForm).toBeInTheDocument();

        const errorShow = getByTestId('error-show');
        expect(errorShow).toBeInTheDocument();
        expect(getByText(mockError)).toBeInTheDocument();
    });

    it('should call the onSubmit function with the updated inputs when the form is submitted', () => {
        const { getByTestId, getByText } = render(
            <EditProfileForm
                onSubmit={mockOnSubmit}
                profileData={mockProfileData}
                error={null}
                setError={mockSetError}
            />
        );

        const editProfileForm = getByTestId('edit-profile-form');
        expect(editProfileForm).toBeInTheDocument();

        const nameInput = getByTestId('name-input');
        const saveButton = getByText('SAVE');

        fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
        fireEvent.click(saveButton);

        expect(mockOnSubmit).toHaveBeenCalledWith({ name: 'Jane Doe' });
    });
});
