import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';
import './styles.scss';

const calculateProgress = progress => {
  const rotationDegree = progress <= 50 ?
    ((100 - (50 - progress)) / 100 * 360 * -1) :
    ((100 - progress) / 100 * 360);
  return `rotate(${rotationDegree}deg)`;
};

export let showLoader = () => {};

const MouseLoader = ({ fillColor = '#3498db', backgroundColor = '#d1e8ff' }) => {
  const [progress, setProgress] = useState(0);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const handleMouseMove = throttle(({ clientX, clientY }) => {
    setPosition({ top: clientY - 15, left: clientX + 15 });
  }, 20);

  useEffect(() => {
    showLoader = setProgress;
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      showLoader = () => {};
    };
  }, []);

  return progress ? (
    <div
      className='pie-wrapper'
      style={{
        background: `linear-gradient(to right, ${fillColor} 50%, ${backgroundColor} 50%)`,
        ...position
      }}
    >
      <span className='pie' style={{
        background: progress <= 50 ? backgroundColor : fillColor,
        transform: calculateProgress(progress)
      }}/>
    </div>
  ) : null;
};

MouseLoader.propTypes = {
  fillColor: PropTypes.string,
  backgroundColor: PropTypes.string,
};

export default MouseLoader;
