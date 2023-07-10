import { render, screen } from '@testing-library/react';
import Toastify from '../Toastify.jsx';

test('renders the ToastContainer component', () => {
    render(<Toastify />);

    // Assert that the ToastContainer component is rendered
    const container = screen.getByTestId("toastify");
    expect(container).toBeInTheDocument();
});

