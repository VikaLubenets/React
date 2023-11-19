import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { productsSlice } from '../../store/reducers/productsReducer';
import './Pagination.css';
export default function Pagination() {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.products.currentPage);
  const totalCount = useAppSelector((state) => state.products.totalCount);
  const limitPerPage = useAppSelector((state) => state.products.limitPerPage);
  const totalPages = useAppSelector((state) => state.products.totalPages);

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  useEffect(() => {
    dispatch(
      productsSlice.actions.setTotalPages(Math.ceil(totalCount / limitPerPage))
    );
  }, [totalCount, limitPerPage]);

  const handlePageClick = (pageNumber: number) => {
    dispatch(productsSlice.actions.setCurrentPage(pageNumber));
  };

  return (
    <div className="pagination" data-testid="pagination">
      {pageNumbers.map((number) => (
        <div
          className={`pagination-item ${
            currentPage === number ? 'current' : ''
          }`}
          key={number}
          onClick={() => handlePageClick(number)}
        >
          {number}
        </div>
      ))}
    </div>
  );
}
