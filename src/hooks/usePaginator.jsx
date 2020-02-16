import React, { useState } from 'react';

const PAGE_LIMIT = 5;

const usePaginator = () => {
  const [paginatedList, setPaginatedList] = useState([]);
  const [totalPages, setTotalPages] = useState([]);

  const paginate = ({ list, pageNumber }) => {
    const tempPageNumber = pageNumber || 1;
    const firstIndex = (tempPageNumber - 1) * PAGE_LIMIT;
    const lastIndex = tempPageNumber * PAGE_LIMIT;

    setTotalPages(Math.ceil(list.length / PAGE_LIMIT));
    setPaginatedList(list.slice(firstIndex, lastIndex));
  };

  return [{ paginatedList, totalPages }, paginate];
};

export default usePaginator;
