import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SideNavToggleButton from '../SideNavToggleButton';

test('renders the SideNavToggleButton component', () => {
    const { getByRole } = render(<SideNavToggleButton showSideNavCallback={() => { }} />);
    const toggleButton = getByRole('button');
    expect(toggleButton).toBeInTheDocument();
});

test('toggles the showSideNav state when the button is clicked and calls the showSideNavCallback', () => {
    const showSideNavCallback = vitest.fn();

    const { getByRole } = render(<SideNavToggleButton showSideNavCallback={showSideNavCallback} />);
    const toggleButton = getByRole('button');

    fireEvent.click(toggleButton);
    expect(showSideNavCallback).toHaveBeenCalledWith(true);

    fireEvent.click(toggleButton);
    expect(showSideNavCallback).toHaveBeenCalledWith(false);

    waitFor(() => {
        expect(showSideNavCallback).toHaveBeenCalledTimes(1);
    });
});

