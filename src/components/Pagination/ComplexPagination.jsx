import React from 'react';
import PropTypes from 'prop-types';
import { inRange } from 'lodash';
import PageSize from './PageSize';

const SimplePagination = props => {
  const { currentPage, numberOfPages, onSelect, pageSize, onPageSizeChange } = props;
  let pageButtons = inRange(currentPage, 3, numberOfPages - 2) ?
    createArr(currentPage + 2).slice(currentPage - 3) :
    (currentPage < 3 ? createArr(5) : createArr(numberOfPages).slice(numberOfPages - 5));

  const handleClick = ({ currentTarget: { innerText: page } }) => {
    switch (page) {
      case '<': onSelect(currentPage - 1); break;
      case '<<': onSelect(1); break;
      case '>': onSelect(currentPage + 1); break;
      case '>>': onSelect(numberOfPages); break;
      default: onSelect(Number(page));
    }
  };

  return (
    <div className='pagination'>
      <div className='pagination__container'>
        <button onClick={handleClick} className='pagination__item' disabled={currentPage === 1}>{'<<'}</button>
        <button onClick={handleClick} className='pagination__item' disabled={currentPage === 1}>{'<'}</button>
        {currentPage > 3 && <span className='pagination__item dots'>...</span>}
        {pageButtons.map(el =>
          <button key={el} onClick={handleClick} className={`pagination__item${currentPage === el ? ' active' : ''}`}>
            {el}
          </button>)}
        {currentPage < numberOfPages - 2 && <span className='pagination__item dots'>...</span>}
        <button onClick={handleClick} className='pagination__item' disabled={currentPage === numberOfPages}>{'>'}</button>
        <button onClick={handleClick} className='pagination__item' disabled={currentPage === numberOfPages}>{'>>'}</button>
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

const createArr = length => Array.from({ length }, (v, k) => k + 1);
