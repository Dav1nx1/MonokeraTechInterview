import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from '@/components/shared/Pagination';
import '@testing-library/jest-dom';
import React from 'react';

describe('Pagination Component', () => {
  const mockHandleNextPage = jest.fn();
  const mockHandlePreviousPage = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the correct page and total pages', () => {
    render(
      <Pagination
        currentPage={2}
        pages={5}
        handleNextPage={mockHandleNextPage}
        handlePreviousPage={mockHandlePreviousPage}
      />
    );

    // Check if the correct page information is rendered
    expect(screen.getByText('Page 2 of 5')).toBeInTheDocument();
  });

  it('should disable the previous button on the first page', () => {
    render(
      <Pagination
        currentPage={1}
        pages={5}
        handleNextPage={mockHandleNextPage}
        handlePreviousPage={mockHandlePreviousPage}
      />
    );

    const prevButton = screen.getByLabelText('Go to previous page');
    expect(prevButton).toBeDisabled();
  });

  it('should disable the next button on the last page', () => {
    render(
      <Pagination
        currentPage={5}
        pages={5}
        handleNextPage={mockHandleNextPage}
        handlePreviousPage={mockHandlePreviousPage}
      />
    );

    const nextButton = screen.getByLabelText('Go to next page');
    expect(nextButton).toBeDisabled();
  });

  it('should call handleNextPage when the next button is clicked', () => {
    render(
      <Pagination
        currentPage={2}
        pages={5}
        handleNextPage={mockHandleNextPage}
        handlePreviousPage={mockHandlePreviousPage}
      />
    );

    const nextButton = screen.getByLabelText('Go to next page');
    fireEvent.click(nextButton);

    // Check if handleNextPage is called
    expect(mockHandleNextPage).toHaveBeenCalledTimes(1);
  });

  it('should call handlePreviousPage when the previous button is clicked', () => {
    render(
      <Pagination
        currentPage={2}
        pages={5}
        handleNextPage={mockHandleNextPage}
        handlePreviousPage={mockHandlePreviousPage}
      />
    );

    const prevButton = screen.getByLabelText('Go to previous page');
    fireEvent.click(prevButton);

    // Check if handlePreviousPage is called
    expect(mockHandlePreviousPage).toHaveBeenCalledTimes(1);
  });
});
