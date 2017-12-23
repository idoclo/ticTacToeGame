import React from 'react';
import { Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';


const Square = ({ value, index, clickMethod, activePlayer, toggleActivePlayer, gameId, winner}) => {
  const handleClick = (i) => {
    if (!gameId) {
      window.alert('The game is over. Please start a new game.');
    } else if (value) {
      window.alert('Square occupied - please pick another square.');
    } else {
      const piece = activePlayer === 'playerX' ? 'X' : 'O';
      clickMethod(i, piece);
      // update active player piece
      const newActivePlayer = piece === 'X' ? 'playerO' : 'playerX';
      toggleActivePlayer(newActivePlayer);
    }
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
      className={winner ? "winning-square" : "square"}
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
  activePlayer: PropTypes.string.isRequired,
  toggleActivePlayer: PropTypes.func.isRequired,
  gameId: PropTypes.number.isRequired
};

export default Square;