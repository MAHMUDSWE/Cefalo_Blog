import { render, screen } from '@testing-library/react';
import CefaloBlogLogo from '../CefaloBlogLogo';

test('renders Cefalo Blog Logo component', () => {
    render(<CefaloBlogLogo />);

    // Assert that the image is rendered
    const logoImage = screen.getByAltText('Cefalo Blog Logo');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', '/src/assets/logo.jpg');
    expect(logoImage).toHaveClass('w-14 h-14');

    // Assert that the heading is rendered
    const heading = screen.getByText('Cefalo Blog');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass('text-primary text-3xl sm:text-4xl font-bold');
});
