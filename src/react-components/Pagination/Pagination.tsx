import { useEffect, useState } from 'react';
import { PaginationProps } from './types';
import './pagination.css';

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);

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
          onClick={() => onPageChange(number)}
        >
          {number}
        </div>
      ))}
    </div>
  );
}
