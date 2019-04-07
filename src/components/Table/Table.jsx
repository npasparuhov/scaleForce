import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Row from './Row';
import Header from './Header';
import SimplePagination from '../Pagination/SimplePagination';
import ComplexPagination from '../Pagination/ComplexPagination';
import usePagination from '../../customHooks/Pagination';
import useSort from '../../customHooks/Sorting';
import './styles.scss';

const Table = props => {
  const [results, setResults] = useState([]);
  const [columns, setColumns] = useState(props.columns);
  const pagination = usePagination(props.fetchMethod, setResults, columns);
  const { pageSize, numberOfPages, currentPage, handlePageChange, handlePageSizeChange } = pagination;
  const sort = useSort(props.fetchMethod, columns, pagination, setResults, setColumns);

  return (
    <div className='table'>
      <Header columns={columns} onSort={sort} />
      <div className='table__body'>
        {results.map((row, i) =>
          <Row key={`row-${i}`} id={`row-${i}`} row={row} columns={columns} />)}
      </div>
      {numberOfPages > 10 ?
        <ComplexPagination
          numberOfPages={numberOfPages}
          currentPage={currentPage}
          onSelect={handlePageChange}
          pageSize={pageSize}
          onPageSizeChange={handlePageSizeChange} /> :
        <SimplePagination
          numberOfPages={numberOfPages}
          currentPage={currentPage}
          onSelect={handlePageChange}
          pageSize={pageSize}
          onPageSizeChange={handlePageSizeChange} />}
    </div>
  );
};

Table.propTypes = {
  fetchMethod: PropTypes.func.isRequired,
  columns: PropTypes.array.isRequired,
};

export default Table;
