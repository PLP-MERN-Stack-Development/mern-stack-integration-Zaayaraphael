import { useState } from 'react';

export const usePagination = (initialPage = 1) => {
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);

  const hasNext = page < totalPages;
  const hasPrev = page > 1;

  const nextPage = () => {
    if (hasNext) {
      setPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (hasPrev) {
      setPage((prev) => prev - 1);
    }
  };

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setPage(pageNumber);
    }
  };

  const reset = () => {
    setPage(1);
  };

  return {
    page,
    setPage,
    totalPages,
    setTotalPages,
    hasNext,
    hasPrev,
    nextPage,
    prevPage,
    goToPage,
    reset,
  };
};
