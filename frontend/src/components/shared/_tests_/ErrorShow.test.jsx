import { render, screen } from '@testing-library/react';
import ErrorShow from '../ErrorShow';

test('renders error message and WarningIcon when error prop is provided', () => {
    const errorText = 'Something went wrong!';
    render(<ErrorShow error={errorText} />);

    // Assert that the error message is rendered
    const errorMessage = screen.getByText(errorText);
    expect(errorMessage).toBeInTheDocument();

    // Assert that the WarningIcon component is rendered
    const warningIcon = screen.getByTestId('warning-icon'); // Assuming the WarningIcon component has a testid
    expect(warningIcon).toBeInTheDocument();
});

test('does not render error message and WarningIcon when error prop is not provided', () => {
    render(<ErrorShow />);

    // Assert that the error message is not rendered
    const errorMessage = screen.queryByText(/.+/);
    expect(errorMessage).toBeNull();

    // Assert that the WarningIcon component is not rendered
    const warningIcon = screen.queryByTestId('warning-icon');
    expect(warningIcon).toBeNull();
});
