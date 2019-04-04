import React from 'react';
import PropTypes from 'prop-types';
import Cell from './Cell';


const Row = ({ row, columns }) => (
  <div className='table__row'>
    {columns.map(cell => <Cell key={cell.key} cell={cell} row={row} />)}
  </div>
);

Row.propTypes = {
  columns: PropTypes.array.isRequired,
  row: PropTypes.object.isRequired,
};

export default Row;
