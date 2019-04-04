import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Row from './Row';
import SimplePagination from '../Pagination/SimplePagination';
import { getReq } from '../../services/makeRequest';
import './styles.scss';

const Table = props => {
  const { url, accessors, columns } = props;
  const [countries, setCountries] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const numberOfPages = countries.length / pageSize;
  const pageButtons = Array.from({ length: numberOfPages }, (v, k) => k + 1);

  const isComplex = pageButtons.length > 10;

  useEffect(() => {
    const receiveData = async () => {
      const [data, err] = await getReq(url, accessors);
      if (err) console.log(err);
      else setCountries(data);
    };
    receiveData();
  }, []);

  const handlePageChange = page => setCurrentPage(page);

  return (
    <div className='table'>
      {/* <div className='pagination'>
        {isComplex && <span className='pagination__item'>{'<<'}</span>}
        <span className='pagination__item'>{'<'}</span>
        {}
        {pageButtons.map(el =>
          <span
            key={el}
            className={`pagination__item${selectedPage === el ? ' active' : ''}`}>
            {el}
          </span>)}
        <span className='pagination__item'>{'>'}</span>
        {isComplex && <span className='pagination__item'>{'>>'}</span>}
      </div> */}
      <SimplePagination
        numberOfPages={10}
        currentPage={currentPage}
        onSelect={handlePageChange} />
      {countries.map((row, i) =>
        <Row key={`row-${i}`} row={row} columns={columns} />)}
    </div>
  );
};


Table.propTypes = {
  url: PropTypes.string.isRequired,
  accessors: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
};

export default Table;
