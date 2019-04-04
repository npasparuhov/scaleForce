import React from 'react';
import PropTypes from 'prop-types';
import Interweave from 'interweave';

const Suggestion = props => {
  const { input, name, flag, region, subregion, cioc, hideSuggestions } = props;

  const handleClick = country => {
    console.log(country);
    // hideSuggestions();
  };

  return (
    <div className='search-bar__suggestions-item' onClick={() => handleClick(props)}>
      <img className='flag' src={flag} alt={flag} />
      <div className='info'>
        <Interweave content={formatLabel(name, input)} />
        <span className='info__country'>{[region, subregion, cioc].filter(Boolean).join(', ')}</span>
      </div>
    </div>
  );
};

Suggestion.propTypes = {
  input: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  flag: PropTypes.string.isRequired,
  cioc: PropTypes.string,
  region: PropTypes.string,
  subregion: PropTypes.string,
  hideSuggestions: PropTypes.func.isRequired,
};

export default Suggestion;


const formatLabel = (label, value) =>
  label.replace(new RegExp(value, 'ig'), '<b>$&</b>');
