import React from 'react';
import PropTypes from 'prop-types';
import Cell from './Cell';
import CountryDetails from '../CountryDetails/CountryDetails';
import { showPopUp } from '../PopUp/PopUp';
import useMouseLoader from '../../customHooks/MouseLoader';

const Row = ({ row, columns, id }) => {
  const handleClick = () => showPopUp(CountryDetails({ data: row }));
  const mouseLoader = useMouseLoader(handleClick);

  return (
    <div className='table__row' id={id} {...mouseLoader}>
      {columns.map(cell => <Cell key={cell.key} cell={cell} row={row} />)}
    </div>
  );
};

Row.propTypes = {
  columns: PropTypes.array.isRequired,
  row: PropTypes.object.isRequired,
};

export default Row;
