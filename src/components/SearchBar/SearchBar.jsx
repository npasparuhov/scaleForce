import React from 'react';
import PropTypes from 'prop-types';
import Suggestion from './Suggestion';
import useSearchBar from '../../customHooks/SearchBar';
import './styles.scss';

const SearchBar = ({ fetchMethod, maxSuggestions }) => {
  const {
    locationInput,
    isOpen,
    matches,
    loading,
    hideSuggestions } = useSearchBar(fetchMethod, maxSuggestions);

  //We need to put the call of hideMethod inside callbackQueue
  //The flow will be -> onBlur call - hideMethod in callbackQueue - stack get empty -
  //render is executed - event loop moves the hideMethod from callbackQueue to stack
  //so when the hideMethod is executed at least 1 render will be done and the active
  //element will be different from the searchBar container
  const handleBlur = ({ currentTarget: target }) => {
    setTimeout(() => {
      console.log(target);
      console.log(document.activeElement);
      if (!target.contains(document.activeElement)) hideSuggestions();
    }, 100);
  };

  return (
    <div className='search-bar' onBlur={handleBlur}>
      {loading && <div className='loader' />}
      <input
        {...locationInput}
        className='search-bar__field'
        placeholder='Country name' />
      {isOpen && !loading && (
        <div className='search-bar__suggestions'>
          {matches.length ? matches.map(el =>
            <Suggestion
              key={el.name}
              {...el}
              input={locationInput.value}
              hideSuggestions={hideSuggestions} />) :
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
