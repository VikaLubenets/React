/* eslint-disable jest/no-commented-out-tests */
import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AppContext } from '../../react-components/Contexts/AppContext';
import './Pagination.css';

export default function Pagination() {
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);
  const { currentPage, totalPages, setCurrentPage } = useContext(AppContext);

  useEffect(() => {
    const numbers = Array.from({ length: totalPages }, (_, index) => index + 1);
    setPageNumbers(numbers);
  }, [totalPages]);

  return (
    <div className="pagination">
      {pageNumbers.map((number) => (
        <div
          className={`pagination-item ${
            currentPage === number ? ' current' : ''
          }`}
          key={number}
          onClick={() => setCurrentPage(number)}
        >
          {number}
        </div>
      ))}
    </div>
  );
}

// import { useContext } from 'react';
// import { render, fireEvent } from '@testing-library/react';
// import Pagination from './Pagination';

// jest.mock('react', () => ({
//   ...jest.requireActual('react'),
//   useContext: jest.fn(),
// }));

// describe('Pagination component', () => {
//   it('updates URL query parameter when page changes', () => {
//     const testContext = {
//       savedTerm: '',
//       searchedResults: [],
//       isLoaded: false,
//       totalCount: 50,
//       currentPage: 1,
//       limitPerPage: 10,
//       totalPages: 5,
//       setSavedTerm: jest.fn(),
//       setSearchResults: jest.fn(),
//       setIsLoaded: jest.fn(),
//       setTotalCount: jest.fn(),
//       setCurrentPage: jest.fn(),
//       setLimitPerPage: jest.fn(),
//       setTotalPages: jest.fn(),
//     };

//     (useContext as jest.Mock).mockReturnValue(testContext);

//     const { getByText } = render(<Pagination />);

//     const page1 = getByText('1');
//     const page2 = getByText('2');

//     fireEvent.click(page1);
//     fireEvent.click(page2);

//     expect(testContext.setCurrentPage).toHaveBeenCalledWith(1);
//     expect(testContext.setCurrentPage).toHaveBeenCalledWith(2);

//     expect(window.location.search).toBe('?page=2');
//   });
// });
