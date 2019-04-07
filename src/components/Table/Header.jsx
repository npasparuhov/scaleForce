import React from 'react';
import PropTypes from 'prop-types';
import { capitalize } from 'lodash';

const Header = ({ columns, onSort }) => (
  <div className='table__header'>
    {columns.map(({ key, order, headerName, width, component }, ind) => (
      <div
        key={key + ind}
        onClick={() => !component && onSort(key)}
        className={`table__header--item${order && !component ? ' active' : ''}${component ? ' not-sortable' : ''}`}
        style={{ flex: `0 1 ${width}px` }}>
        {!component && <Arrow order={order} />}
        <span>{capitalize(headerName || key)}</span>
      </div>))}
  </div>);

Header.propTypes = {
  columns: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
};

const Arrow = ({ order }) =>
  <svg
    style={{
      display: order ? 'inline-block' : 'none',
      transform: `rotate(${order === 'desc' ? '180deg' : '0deg'})`
    }}
    className='table__header--arrow'
    viewBox='0 0 24 24'
    role='presentation'>
    <path d='M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z' />
  </svg>;

export default Header;
