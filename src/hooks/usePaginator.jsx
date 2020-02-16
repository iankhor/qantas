import React, { useState } from 'react';

const PAGE_LIMIT = 10;

const usePaginator = () => {
  const [paginatedList, setPaginatedList] = useState([]);

  const paginate = ({ list, pageNumber }) => {
    const tempPageNumber = pageNumber || 1;
    const firstIndex = (tempPageNumber - 1) * PAGE_LIMIT;
    const lastIndex = tempPageNumber * PAGE_LIMIT;

    setPaginatedList(list.slice(firstIndex, lastIndex));
  };

  return [{ paginatedList }, paginate];
};

export default usePaginator;
