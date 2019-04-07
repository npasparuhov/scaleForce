import React from 'react';
import PropTypes from 'prop-types';

const PageSize = ({ selected, label, options, onPageSizeChange }) => (
  <div>
    <span>{label}</span>
    <select value={selected} onChange={({ target: { value } }) => onPageSizeChange(Number(value))}>
      {options.map((el, i) => <option key={el + i} value={el}>{el}</option>)}
    </select>
  </div>
);

PageSize.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array.isRequired,
  selected: PropTypes.number.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
};

export default PageSize;
