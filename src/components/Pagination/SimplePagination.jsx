import React from 'react';
import PropTypes from 'prop-types';
import PageSize from './PageSize';
import './Pagination.scss';

const SimplePagination = props => {
  const { currentPage, numberOfPages, onSelect, pageSize, onPageSizeChange } = props;
  const pageButtons = Array.from({ length: numberOfPages }, (v, k) => k + 1);

  const handleClick = ({ currentTarget: { innerText: page } }) => {
    let newPage;
    switch (page) {
      case '<': newPage = currentPage - 1; break;
      case '>': newPage = currentPage + 1; break;
      default: newPage = Number(page);
    }
    onSelect(newPage);
  };

  return (
    <div className='pagination'>
      <div className='pagination__container'>
        <button onClick={handleClick} className='pagination__item' disabled={currentPage === 1}>{'<'}</button>
        {pageButtons.map(el =>
          <button key={el} onClick={handleClick} className={`pagination__item${currentPage === el ? ' active' : ''}`}>{el}</button>)}
        <button onClick={handleClick} className='pagination__item' disabled={currentPage === numberOfPages}>{'>'}</button>
      </div>
      <PageSize label='Items per page: ' selected={pageSize} options={[10, 20, 30, 40, 50]} onPageSizeChange={onPageSizeChange} />
    </div>
  );
};

SimplePagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  numberOfPages: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default SimplePagination;
