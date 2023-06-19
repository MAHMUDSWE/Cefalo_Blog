import { render, screen, fireEvent } from '@testing-library/react';
import ShowPassword from '../ShowPassword';

test('renders the ShowPassword component', () => {
    render(<ShowPassword onTogglePassword={() => { }} />);

    const showPasswordElement = screen.getByTestId('show-password');
    expect(showPasswordElement).toBeInTheDocument();
});

test('initially displays the EyeOff icon', () => {
    render(<ShowPassword onTogglePassword={() => { }} />);


    const eyeOffIcon = screen.getByTestId('eye-off-icon')
    expect(eyeOffIcon).toBeInTheDocument();
});

test('toggles password visibility when clicked', () => {
    const mockTogglePassword = vitest.fn();
    render(<ShowPassword onTogglePassword={mockTogglePassword} />);

    const showPasswordElement = screen.getByTestId('show-password');
    fireEvent.click(showPasswordElement);

    expect(mockTogglePassword).toHaveBeenCalledTimes(1);
    expect(mockTogglePassword).toHaveBeenCalledWith(true);
});

test('displays the EyeOn icon when password is visible', () => {
    render(<ShowPassword onTogglePassword={() => { }} />);

    const showPasswordElement = screen.getByTestId('show-password');
    fireEvent.click(showPasswordElement);

    const eyeOnIcon = screen.getByTestId('eye-on-icon')
    expect(eyeOnIcon).toBeInTheDocument();
});
