import React from 'react';
import { Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';


const Square = ({ value, index, clickMethod, activePlayer }) => {
  const handleClick = (i) => {
    const piece = activePlayer === 'playerX' ? 'X' : 'O';
    clickMethod(i, piece);
  }

  let icon;
  if (value === 'X') {
    icon = <Icon name="remove" size="huge" color="red"/>;
  } else if (value === 'O') {
    icon = <Icon name="radio" size ="huge" color="violet"/>;
  } else {
    icon = null;
  }

  return (
    <div
      className="square"
      role="presentation"
      onClick={() => handleClick(index)}
    >
      {icon}
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