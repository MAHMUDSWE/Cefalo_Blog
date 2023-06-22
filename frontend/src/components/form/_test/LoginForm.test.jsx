import { render, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '../LoginForm';
import validateInputs from '../../../utils/formValidation.util';

vitest.mock('../../../utils/formValidation.util')

// Global variables for test cases
let mockOnSubmit;
let mockSetLoginError;

beforeEach(() => {
    mockOnSubmit = vitest.fn();
    mockSetLoginError = vitest.fn();
});

test('should submit the form with valid inputs', () => {
    const { getByLabelText, getByText } = render(
        <LoginForm onSubmit={mockOnSubmit} loginError={null} setLoginError={mockSetLoginError} />
    );

    const usernameInput = getByLabelText('Username');
    const passwordInput = getByLabelText('Password');
    const submitButton = getByText('Log In');

    // Set input values
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Submit the form
    fireEvent.click(submitButton);

    // Assert that onSubmit function is called with the correct inputs
    expect(mockOnSubmit).toHaveBeenCalledWith({ username: 'testuser', password: 'password123' });
});

test('should display an error message for invalid inputs', () => {
    const mockValidationError = 'Username is required';
    const { getByLabelText, getByText } = render(
        <LoginForm onSubmit={vitest.fn()} loginError={null} setLoginError={mockSetLoginError} />
    );

    const usernameInput = getByLabelText('Username');
    const passwordInput = getByLabelText('Password');
    const submitButton = getByText('Log In');

    // Set input values
    fireEvent.change(usernameInput, { target: { value: '' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    validateInputs.mockReturnValueOnce(mockValidationError)

    // Submit the form
    fireEvent.click(submitButton);

    // Assert that setLoginError function is called with the validation error
    waitFor(() => {
        expect(mockSetLoginError).toHaveBeenCalledWith(mockValidationError);
    })
});

test('should display an error message if password length is not between 4-20 chracters', () => {
    const mockValidationError = 'Password must be between 4-20 characters';
    const { getByLabelText, getByText } = render(
        <LoginForm onSubmit={vitest.fn()} loginError={null} setLoginError={mockSetLoginError} />
    );

    const usernameInput = getByLabelText('Username');
    const passwordInput = getByLabelText('Password');
    const submitButton = getByText('Log In');

    // Set input values
    fireEvent.change(usernameInput, { target: { value: 'username' } });
    fireEvent.change(passwordInput, { target: { value: 'pas' } });

    validateInputs.mockReturnValueOnce(mockValidationError)

    // Submit the form
    fireEvent.click(submitButton);

    // Assert that setLoginError function is called with the validation error
    waitFor(() => {
        expect(mockSetLoginError).toHaveBeenCalledWith(mockValidationError);
    })
});

test('should toggle the password visibility', () => {
    const { getByLabelText, getByTestId } = render(
        <>
            <LoginForm onSubmit={vitest.fn()} loginError={null} setLoginError={mockSetLoginError} />
        </>
    );

    const passwordInput = getByLabelText('Password');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(passwordInput.value).toBe('password123')

    //visible after password field have value
    const showPasswordButton = getByTestId('show-password');

    //initial
    expect(passwordInput.type).toBe('password');

    //clicked
    fireEvent.click(showPasswordButton);
    expect(passwordInput.type).toBe('text');

    //clickedAgain
    fireEvent.click(showPasswordButton);
    expect(passwordInput.type).toBe('password');
});


test('should display an error message when loginError is true', () => {
    const loginError = 'Invalid username or password';
    const { getByText, getByTestId } = render(
        <LoginForm onSubmit={mockOnSubmit} loginError={loginError} setLoginError={mockSetLoginError} />
    );

    const errorShowComponent = getByTestId('error-show');
    const errorIcon = getByTestId('warning-icon')
    const error = getByText(loginError)

    expect(errorShowComponent).toBeInTheDocument();
    expect(errorIcon).toBeInTheDocument();
    expect(error).toBeInTheDocument()

});

