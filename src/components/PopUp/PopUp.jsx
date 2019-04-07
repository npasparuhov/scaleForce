import React, { useState, useEffect, useRef } from 'react';
import './styles.scss';

export let showPopUp = () => {};

const PopUp = () => {
  const [component, setComponent] = useState(null);
  const popUpRef = useRef(null);

  useEffect(() => {
    showPopUp = setComponent;
    return () => {
      showPopUp = () => {};
    };
  }, []);

  useEffect(() => {
    if (component) popUpRef.current.focus();
  }, [component]);

  const closePopUp = ({ target: { id } }) => {
    if (id === 'pop-up' || id === 'pop-up-cross') setComponent(null);
  };

  const handleKeyPress = ({ keyCode }) => (keyCode === 27 && setComponent(null));

  return component && (
    <div
      ref={popUpRef}
      tabIndex='0'
      className='pop-up'
      id='pop-up'
      onClick={closePopUp}
      onKeyDown={handleKeyPress}>
      <div className='pop-up__body'>
        <span className='close' id='pop-up-cross' onClick={closePopUp} />
        {component}
      </div>
    </div>
  );
};

export default PopUp;
