import React from 'react';
import PropTypes from 'prop-types';


const Square = ({ value, index, clickMethod, activePlayer }) => {
  const handleClick = (i) => {
    const piece = activePlayer === 'player1' ? 'X' : 'O';
    clickMethod(i, piece);
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
  clickMethod: PropTypes.func.isRequired,
  activePlayer: PropTypes.string.isRequired
};

export default Square;