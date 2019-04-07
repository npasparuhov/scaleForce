import React from 'react';
import PropTypes from 'prop-types';

const Cell = ({ row, cell }) => {
  if (!cell || !row[cell.key])
    return <div className='table__cell' style={{ flex: `0 1 ${cell.width}px` }}>-</div>;

  return (
    <div
      className='table__cell'
      style={{ flex: `0 1 ${cell.width}px` }}>
      {cell.component ?
        cell.component(row[cell.key]) :
        <span>{row[cell.key]}</span>}
    </div>);
};

Cell.propTypes = {
  cell: PropTypes.object.isRequired,
  row: PropTypes.object.isRequired,
};

export default Cell;
