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
