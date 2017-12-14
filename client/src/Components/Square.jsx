import React from 'react';
import PropTypes from 'prop-types';


const Square = ({ value, index, clickMethod }) => {
  const handleClick = (i) => {
    clickMethod(i, 'X');
  }

  return (
    <div
      className="square"
      role="presentation"
      onClick={() => handleClick(index)}
    >
      {value}
    </div>
  )
};

Square.propTypes = {
  value: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  clickMethod: PropTypes.func.isRequired
};

export default Square;