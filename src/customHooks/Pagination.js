import { useEffect, useState } from 'react';
import { find } from 'lodash';

export default (fetchMethod, changeResults, columns) => {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const activeColumn = find(columns, 'order') || {};
  const { key, order } = activeColumn;

  useEffect(() => {
    const receiveData = async () => {
      const { results, numberOfPages, err } =
        await fetchMethod({ pageSize: 10, currentPage: 1, active: key, order });
      if (err) console.log(err);
      else {
        changeResults(results);
        setNumberOfPages(numberOfPages);
      }
    };
    receiveData();
  }, []);

  const handlePageChange = async page => {
    setCurrentPage(page);
    const { results, numberOfPages, err } =
      await fetchMethod({ pageSize, currentPage: page, active: key, order });
    if (err) console.log(err);
    changeResults(results);
    setNumberOfPages(numberOfPages);
  };

  const handlePageSizeChange = async newSize => {
    setPageSize(newSize);
    const { results, numberOfPages, err } =
      await fetchMethod({ pageSize: newSize, currentPage, active: key, order });
    if (err) console.log(err);
    changeResults(results);
    setNumberOfPages(numberOfPages);
    if (numberOfPages < currentPage) setCurrentPage(numberOfPages);
  };

  return {
    currentPage,
    pageSize,
    numberOfPages,
    handlePageChange,
    handlePageSizeChange
  };
};
