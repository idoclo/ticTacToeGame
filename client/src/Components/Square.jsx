import React, { Component } from 'react';
import { Icon, Portal, Segment, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';


class Square extends Component {
  constructor(props) {
    super(props);
    this.state = {
      poorMovePortalOpen: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handlePoorMovePortalClose = this.handlePoorMovePortalClose.bind(this);
  }

  handleClick(i) {
    const { value, clickMethod, activePlayer, toggleActivePlayer, gameId } = this.props;  // eslint-disable-line react/prop-types
    if (value) {
      this.setState({ poorMovePortalOpen: true });
    } else if (gameId) {
      const piece = activePlayer === 'playerX' ? 'X' : 'O';
      clickMethod(i, piece);
      // update active player piece
      const newActivePlayer = piece === 'X' ? 'playerO' : 'playerX';
      toggleActivePlayer(newActivePlayer);
    }
  }

  handlePoorMovePortalClose() {
    this.setState({ poorMovePortalOpen: false });
  }

  render() {
    const { value, index, winner } = this.props;
    const { poorMovePortalOpen } = this.state;
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
      onClick={() => this.handleClick(index)}
      >
        {icon}
        <Portal
          open={poorMovePortalOpen}
          onClose={this.handlePoorMovePortalClose}
        >
          <Segment style={{ left: '35%', position: 'fixed', top: '40%', zIndex: 1000 }}>
            <Header>
              <Icon name="ban" style={{color: 'red'}}/>
              Square occupied - please pick another square.
            </Header>
          </Segment>
        </Portal>
      </div>
    );
  }
};


Square.propTypes = {
  value: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  clickMethod: PropTypes.func.isRequired,
  activePlayer: PropTypes.string.isRequired,
  toggleActivePlayer: PropTypes.func.isRequired,
  gameId: PropTypes.number.isRequired,
  winner: PropTypes.bool.isRequired
};

export default Square;