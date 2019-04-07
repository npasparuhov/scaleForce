import React from 'react';
import PropTypes from 'prop-types';
import { isArray, isObject, has, capitalize } from 'lodash';
import './styles.scss';

const CountryDetails = ({ data }) => () => {
  const hasName = obj => isObject(obj) && has(obj, 'name');

  const joinArray = arr => arr.map(el => (hasName(el) ? el.name : el)).join(', ');

  const keys = Object.keys(data).filter(key => (!isObject(data[key]) ||
    (isArray(data[key]) && data[key].length)) &&
    data[key]);

  return (
    <div className='country-details'>
      {keys.map(key =>
        <div key={key} className='country-details__item'>
          <b>{capitalize(key)}: </b>
          <span>
            {isArray(data[key]) ?
              joinArray(data[key]) :
              (key !== 'flag' ?
                data[key] :
                <img src={data[key]} className='flag' />)}
          </span>
        </div>)}
    </div>
  );
};

CountryDetails.propTypes = {
  data: PropTypes.object,
};

export default CountryDetails;
