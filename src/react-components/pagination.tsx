import { FunctionComponent } from 'react';
import '../styles/pagination.css';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      {pageNumbers.map((number) => (
        <div
          className={
            currentPage === number
              ? 'pagination-item current'
              : 'pagination-item'
          }
          key={number}
          onClick={() => onPageChange(number)}
        >
          {number}
        </div>
      ))}
    </div>
  );
}
