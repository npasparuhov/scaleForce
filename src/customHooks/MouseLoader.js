import { showLoader } from '../components/MouseLoader/MouseLoader';

let currentElement = null;
let interval = null;
let progress = 0;

export default successCallback => {

  const handleMouseDown = ({ currentTarget }) => {
    currentElement = currentTarget;
    interval = setInterval(() => {
      progress += 2;
      showLoader(progress);
      if (progress === 100) {
        clearInterval(interval);
        progress = 0;
        showLoader(progress);
        successCallback();
      }
    }, 20);
  };

  const handleMouseUp = () => {
    if (interval) {
      clearInterval(interval);
      interval = null;
      progress = 0;
      showLoader(progress);
    }
  };

  const handleMouseOut = ({ target }) => {
    if (currentElement && !currentElement.contains(target)) {
      interval && clearInterval(interval);
      interval = null;
      progress = 0;
      showLoader(progress);
    }
  };

  return {
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    onMouseOut: handleMouseOut
  };
};
