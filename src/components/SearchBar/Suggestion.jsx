import React from 'react';
import PropTypes from 'prop-types';
import Interweave from 'interweave';
import CountryDetails from '../CountryDetails/CountryDetails';
import { showPopUp } from '../PopUp/PopUp';

const Suggestion = props => {
  const { input, name, flag, region, subregion, cioc, onSelect, tabIndex } = props;

  const handleClick = () => {
    const country = { ...props };
    delete country.input;
    delete country.onSelect;
    showPopUp(CountryDetails({ data: country }));
    onSelect(country);
  };

  return (
    <div tabIndex={tabIndex} className='search-bar__suggestions-item' onClick={handleClick}>
      <img className='flag' src={flag} alt={flag} />
      <div className='info'>
        <Interweave content={formatLabel(name, input)} />
        <span className='info__country'>
          <Interweave
            content={
              [region, subregion, cioc]
                .map(el => formatLabel(el, input))
                .filter(Boolean)
                .join(', ')}
          />
        </span>
      </div>
    </div>
  );
};

Suggestion.propTypes = {
  input: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  flag: PropTypes.string,
  cioc: PropTypes.string,
  region: PropTypes.string,
  subregion: PropTypes.string,
};

export default Suggestion;


const formatLabel = (label, value) =>
  (label ? label.replace(new RegExp(value, 'ig'), '<b>$&</b>') : null);
