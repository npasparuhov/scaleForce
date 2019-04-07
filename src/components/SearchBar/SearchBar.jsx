import React from 'react';
import PropTypes from 'prop-types';
import useSearchBar from '../../customHooks/SearchBar';
import './styles.scss';

const SearchBar = ({ fetchMethod, maxSuggestions, renderSuggestion: Suggestion }) => {
  const {
    locationInput,
    isOpen,
    matches,
    loading,
    hideSuggestions,
    handleSelect } = useSearchBar(fetchMethod, maxSuggestions);

  //We need to put the call of hideMethod inside callbackQueue
  //The flow will be -> onBlur call - hideMethod in callbackQueue - stack get empty -
  //render is executed - event loop moves the hideMethod from callbackQueue to stack
  //so when the hideMethod is executed at least 1 render will be done and the active
  //element will be different from the searchBar container
  const handleBlur = ({ currentTarget: target }) => {
    setTimeout(() => {
      if (!target.contains(document.activeElement)) hideSuggestions();
    }, 100);
  };

  const onSelect = country => handleSelect(country);

  return (
    <div className='search-bar' onBlur={handleBlur} tabIndex='1'>
      {loading && <div className='loader' />}
      <input
        {...locationInput}
        className='search-bar__field'
        placeholder='Country name' />
      {isOpen && !loading && (
        <div className='search-bar__suggestions'>
          {matches.length ? matches.map((el, i) =>
            <Suggestion
              key={el.name}
              {...el}
              input={locationInput.value}
              onSelect={onSelect} />) :
            <div className='search-bar__no-results'>No results found</div>}
        </div>)}
    </div>
  );
};

SearchBar.propTypes = {
  fetchMethod: PropTypes.func.isRequired,
  maxSuggestions: PropTypes.number,
};

export default SearchBar;
