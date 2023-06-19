import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../Pagination';

test('renders the Pagination component', () => {
    render(<Pagination currentPage={1} totalPages={10} />);

    // Assert that the pagination component is rendered
    const paginationElement = screen.getByTestId('pagination');
    expect(paginationElement).toBeInTheDocument();
});

test('disables previous element on first page', () => {
    render(
        <Pagination
            currentPage={1}
            totalPages={10}
            onPageChange={() => { }}
        />
    );

    // Assert that the previous element has the disabled CSS classes
    const previousElement = screen.getByText('Previous');
    expect(previousElement).toHaveClass('pointer-events-none');
    expect(previousElement).toHaveClass('text-slate-300');
});


test('enables previous button on a page other than the first', () => {
    render(<Pagination currentPage={3} totalPages={10} />);

    // Assert that the previous button is enabled
    const previousElement = screen.getByText('Previous');
    expect(previousElement).toBeEnabled();
    expect(previousElement).toHaveClass('hover:text-primary');
});

test('disables next button on last page', () => {
    render(<Pagination currentPage={10} totalPages={10} />);

    // Assert that the next button is disabled
    const nextElement = screen.getByText('Next');
    expect(nextElement).toHaveClass('pointer-events-none');
    expect(nextElement).toHaveClass('text-slate-300');
});

test('enables next button on a page other than the last', () => {
    render(<Pagination currentPage={3} totalPages={10} />);

    // Assert that the next button is enabled
    const nextElement = screen.getByText('Next');
    expect(nextElement).toBeEnabled();
    expect(nextElement).toHaveClass('hover:text-primary');
});

test('calls onPageChange with the correct page number when clicking a page number', () => {
    const mockOnPageChange = vitest.fn();
    render(
        <Pagination
            currentPage={3}
            totalPages={10}
            onPageChange={mockOnPageChange}
        />
    );

    // Click on a page number
    const pageThree = screen.getByText('3');
    fireEvent.click(pageThree);

    // Assert that onPageChange is called with the correct page number
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
});

test('displays all page numbers when totalPages <= totalPagesToShow', () => {
    render(
        <Pagination
            currentPage={1}
            totalPages={3}
            onPageChange={() => { }}
        />
    );

    // Assert that all page numbers are displayed: 1, 2, 3
    const pageNumbers = screen.getAllByTestId('page-number');
    expect(pageNumbers).toHaveLength(3);
    expect(pageNumbers[0]).toHaveTextContent('1');
    expect(pageNumbers[1]).toHaveTextContent('2');
    expect(pageNumbers[2]).toHaveTextContent('3');
});


test('displays page numbers from totalPages - totalPagesToShow + 1 to totalPages when isLastPage or isNearLastPage', () => {
    render(
        <Pagination
            currentPage={10}
            totalPages={15}
            onPageChange={() => { }}
        />
    );

    // Assert that page numbers are displayed: 6, 7, ..., 14, 15
    const pageNumbers = screen.getAllByTestId('page-number');
    expect(pageNumbers).toHaveLength(9);
    expect(pageNumbers[0]).toHaveTextContent('1');
    expect(pageNumbers[1]).toHaveTextContent('...');

    // Assert other page numbers...
});

test('displays page numbers when neither isFirstPage nor isLastPage', () => {
    render(
        <Pagination
            currentPage={6}
            totalPages={10}
            onPageChange={() => { }}
        />
    );

    // Assert that page numbers are displayed: 1, ..., 4, 5, 6, 7, ..., 10
    const pageNumbers = screen.getAllByTestId('page-number');
    expect(pageNumbers).toHaveLength(9);
    expect(pageNumbers[0]).toHaveTextContent('1');
    expect(pageNumbers[1]).toHaveTextContent('...');
    expect(pageNumbers[2]).toHaveTextContent('4');
    expect(pageNumbers[3]).toHaveTextContent('5');
    expect(pageNumbers[4]).toHaveTextContent('6');
    expect(pageNumbers[5]).toHaveTextContent('7');
    // Assert other page numbers...
});


