import { render, screen } from '@testing-library/react';
import WarningIcon from '../WarningIcon';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

test('renders the WarningIcon with the correct icon, style, and animation', () => {
    render(<WarningIcon />);

    // Assert that the warning icon is rendered
    const warningIcon = screen.getByTestId('warning-icon');
    expect(warningIcon).toBeInTheDocument();

    // Assert the FontAwesomeIcon component
    const fontAwesomeIcon = screen.getByTestId('font-awesome-icon');
    expect(fontAwesomeIcon).toBeInTheDocument();
    expect(fontAwesomeIcon).toBeInTheDocument('icon', faExclamationTriangle.iconName);
    expect(fontAwesomeIcon).toHaveStyle({ color: '#ef4444' });
    expect(fontAwesomeIcon).toBeInTheDocument('beat')
});
