import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import validateInputs from '../../../utils/formValidation.util';
import SignupForm from '../SignupForm';

vitest.mock('../../../utils/formValidation.util');

// Global variables for test cases
let mockOnSubmit;
let mockSetSignupError;
const mockInput = {
    name: 'John Doe',
    email: 'john@example.com',
    username: 'johndoe',
    password: 'password123',
}
beforeEach(() => {
    mockOnSubmit = vitest.fn();
    mockSetSignupError = vitest.fn();
});

test('should submit the form with valid inputs', () => {
    const { getByLabelText, getByText } = render(
        <SignupForm onSubmit={mockOnSubmit} signupError={null} setSignupError={mockSetSignupError} />
    );

    const nameInput = getByLabelText('Full Name');
    const emailInput = getByLabelText('Email');
    const usernameInput = getByLabelText('Username');
    const passwordInput = getByLabelText('Password');

    const submitButton = getByText('Sign Up');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(usernameInput, { target: { value: 'johndoe' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    fireEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith(mockInput);
});

test('should display an error message for invalid inputs', () => {
    const mockValidationError = 'Email is required';
    const { getByLabelText, getByText } = render(
        <SignupForm onSubmit={vitest.fn()} signupError={null} setSignupError={mockSetSignupError} />
    );

    const nameInput = getByLabelText('Full Name');
    const emailInput = getByLabelText('Email');
    const usernameInput = getByLabelText('Username');
    const passwordInput = getByLabelText('Password');
    const submitButton = getByText('Sign Up');

    // Set input values
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: '' } });
    fireEvent.change(usernameInput, { target: { value: 'johndoe' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    validateInputs.mockReturnValueOnce(mockValidationError);

    // Submit the form
    fireEvent.click(submitButton);

    // Assert that setSignupError function is called with the validation error
    waitFor(() => {
        expect(mockSetSignupError).toHaveBeenCalledWith(mockValidationError);
    });
});

test('should display an error message if inputs does not validation rules', () => {
    const mockValidationError = "Name is required";
    const { getByLabelText, getByText } = render(
        <SignupForm onSubmit={vitest.fn()} signupError={null} setSignupError={mockSetSignupError} />
    );

    const nameInput = getByLabelText('Full Name');
    const emailInput = getByLabelText('Email');
    const usernameInput = getByLabelText('Username');
    const passwordInput = getByLabelText('Password');
    const submitButton = getByText('Sign Up');

    // Set input values
    fireEvent.change(nameInput, { target: { value: '' } });
    fireEvent.change(emailInput, { target: { value: '' } });
    fireEvent.change(usernameInput, { target: { value: 'johndoe' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    validateInputs.mockReturnValueOnce(mockValidationError)

    // Submit the form
    fireEvent.click(submitButton);

    // Assert that setLoginError function is called with the validation error
    waitFor(() => {
        expect(mockSetSignupError).toHaveBeenCalledWith(mockValidationError);
    })
});


test('should toggle the password visibility', () => {
    const { getByLabelText, getByTestId } = render(
        <SignupForm onSubmit={vitest.fn()} signupError={null} setSignupError={mockSetSignupError} />
    );

    const passwordInput = getByLabelText('Password');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(passwordInput.value).toBe('password123');

    // Visible after password field has a value
    const showPasswordButton = getByTestId('show-password');

    // Initial
    expect(passwordInput.type).toBe('password');

    // Clicked   
    fireEvent.click(showPasswordButton);
    expect(passwordInput.type).toBe('text');

    // Clicked again
    fireEvent.click(showPasswordButton);
    expect(passwordInput.type).toBe('password');
});

test('should display an error message when signupError is true', () => {
    const signupError = 'Invalid email address';
    const { getByText, getByTestId } = render(
        <SignupForm onSubmit={mockOnSubmit} signupError={signupError} setSignupError={mockSetSignupError} />
    );

    const errorShowComponent = getByTestId('error-show');
    const errorIcon = getByTestId('warning-icon');
    const error = getByText(signupError);

    expect(errorShowComponent).toBeInTheDocument();
    expect(errorIcon).toBeInTheDocument();
    expect(error).toBeInTheDocument();
});
