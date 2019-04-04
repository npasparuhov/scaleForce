import { useState } from 'react';
import { isFinite } from 'lodash';

//This will indicate when to show/hide the loading spinner
let oldValue = '';

export default (fetchMethod, max) => {
  const [value, changeValue] = useState('');
  const [matches, setMatches] = useState([]);

  //This is used to show/hide the suggestions on focus/blur
  //I use this flag because i do not want to make additional ajax request when the field is focused there is no need to make duplicate request of the last one
  const [isOpen, setIsOpen] = useState(value.length > 0);

  const changeMatches = (newMatches, input) => {
    oldValue = input;
    setMatches(newMatches);
  };

  const handleChange = async ({ target: { value: input } }) => {
    changeValue(input);
    setIsOpen(input.length > 0);

    if (input.length > 0)
      try {
        const data = await fetchMethod(input);
        if (isFinite(max) && max > 0) changeMatches(data.slice(0, max), input);
        else changeMatches(data, input);
      } catch (err) {
        if (err !== 'canceled') changeMatches([], input);
      }
    else changeMatches([], input);
  };

  return {
    locationInput: {
      value,
      onChange: handleChange,
      onFocus: () => setIsOpen(value.length > 0)
    },
    hideSuggestions: () => setIsOpen(false),
    isOpen,
    matches,
    loading: value !== oldValue && value.length > 0
  };
};
