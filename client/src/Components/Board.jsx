import React, { Component } from 'react';
import { Segment, Button, Header, Portal, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Square from './Square';


class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      gameId: null,
      winningThree: [],
      drawPortalOpen: false
    };
    this.headers = {
      'Accept': 'application/json, text/plain, */*',
      'content-type': 'application/json'
    }
    this.handleSquareClick = this.handleSquareClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentWillMount() {
    const { playerX, playerO } = this.props;
    if (playerX.length && playerO.length) {
      this.handleReset(null, { value: 'reset' });
    }
  }

  handleSquareClick(index, piece) {
    const { activePlayer, toggleGameOn } = this.props;
    const { squares, gameId } = this.state;

    // if (!playerX.length) {
    //   // window.alert('Need player X');
    //   this.setState({ missingPlayerPortalOpen: true });
    // } else if (!playerO.length) {
    //   // window.alert('Need player O');
    //   this.setState({ missingPlayerPortalOpen: true });
    // } else {
      squares[index] = piece;
      this.setState({ squares });
    // }
    // fetch function to send updated board to server along with gameId
    const payload = {
      squares,
      gameId,
      activePlayer
    };
    const move = {
      method: 'POST',
      headers: this.headers,
      mode: 'cors',
      body: JSON.stringify(payload),
      json: true
    };
    fetch('/games/move', move)
    .then(res => res.json())
    .then(resJSON => {
      // console.log('resJSON move', resJSON);
      if (resJSON === 'draw') {
        toggleGameOn(false);
        this.setState({
          gameId: null,
          drawPortalOpen: true
        });
      }
      if (typeof resJSON === 'object') {
        toggleGameOn(false);
        this.setState({
          gameId: null,
          winningThree: resJSON
        });
        // console.log(this.state.winningThree)
      }
    })
    .catch(err => {
      console.error('Not able to make move to server', err);
    });
  }

  handleReset(event, { value }) {
    const { playerX, playerO, toggleGameOn } = this.props;
    const payload = {
      value,
      playerX,
      playerO
    };
    const myInit = {
      method: 'POST',
      headers: this.headers,
      mode: 'cors',
      body: JSON.stringify(payload),
      json: true
    };
    fetch(`/games/${value}`, myInit)
    .then(res => res.json())
    .then(resJSON => {
      const { game_id, board } = resJSON; // eslint-disable-line camelcase
      toggleGameOn(true);
      this.setState({
        squares: board,
        gameId: game_id,
        winningThree: [],
        drawPortalOpen: false
      });
    })
    .catch(err => {
      console.error('not able to fetch from /games', err);
    });
  }

  render() {
    const { squares, winningThree, drawPortalOpen } = this.state;
    const filledSquareRegEx = /X|O/;
    const buttonTextVisible = filledSquareRegEx.test(squares) ? 'Reset' : 'Start';
    const buttonColour = filledSquareRegEx.test(squares) ? 'blue' : 'green';
    const { playerX, playerO, activePlayer, toggleActivePlayer } = this.props;

    return (
      <Segment id="board-segment">
        <div id="board">
          <div className="row">
            <Square
              value={squares[0]}
              index={0}
              clickMethod={this.handleSquareClick}
              activePlayer={activePlayer}
              toggleActivePlayer={toggleActivePlayer}
              gameId={this.state.gameId}
              winner={winningThree.indexOf(0) > -1}
            />
            <div className="top-column" />
            <Square
              value={squares[1]}
              index={1}
              clickMethod={this.handleSquareClick}
              activePlayer={activePlayer}
              toggleActivePlayer={toggleActivePlayer}
              gameId={this.state.gameId}
              winner={winningThree.indexOf(1) > -1}
            />
            <div className="top-column" />
            <Square
              value={squares[2]}
              index={2}
              clickMethod={this.handleSquareClick}
              activePlayer={activePlayer}
              toggleActivePlayer={toggleActivePlayer}
              gameId={this.state.gameId}
              winner={winningThree.indexOf(2) > -1}
            />
          </div>
          <div className="board-row" />
          <div className="row" id="center-row">
            <Square
              value={squares[3]}
              index={3}
              clickMethod={this.handleSquareClick}
              activePlayer={activePlayer}
              toggleActivePlayer={toggleActivePlayer}
              gameId={this.state.gameId}
              winner={winningThree.indexOf(3) > -1}
            />
            <div className="middle-column" />
            <Square
              value={squares[4]}
              index={4}
              clickMethod={this.handleSquareClick}
              activePlayer={activePlayer}
              toggleActivePlayer={toggleActivePlayer}
              gameId={this.state.gameId}
              winner={winningThree.indexOf(4) > -1}
            />
            <div className="middle-column" />
            <Square
              value={squares[5]}
              index={5}
              clickMethod={this.handleSquareClick}
              activePlayer={activePlayer}
              toggleActivePlayer={toggleActivePlayer}
              gameId={this.state.gameId}
              winner={winningThree.indexOf(5) > -1}
            />
          </div>
          <div className="board-row" />
          <div className="row">
            <Square
              value={squares[6]}
              index={6}
              clickMethod={this.handleSquareClick}
              activePlayer={activePlayer}
              toggleActivePlayer={toggleActivePlayer}
              gameId={this.state.gameId}
              winner={winningThree.indexOf(6) > -1}
            />
            <div className="bottom-column" />
            <Square
              value={squares[7]}
              index={7}
              clickMethod={this.handleSquareClick}
              activePlayer={activePlayer}
              toggleActivePlayer={toggleActivePlayer}
              gameId={this.state.gameId}
              winner={winningThree.indexOf(7) > -1}
            />
            <div className="bottom-column" />
            <Square
              value={squares[8]}
              index={8}
              clickMethod={this.handleSquareClick}
              activePlayer={activePlayer}
              toggleActivePlayer={toggleActivePlayer}
              gameId={this.state.gameId}
              winner={winningThree.indexOf(8) > -1}
            />
          </div>
        </div>
        <div className="button">
          <Button
            color={buttonColour}
            value="reset"
            onClick={this.handleReset}
          >
            {buttonTextVisible}
          </Button>
        </div>
        <Portal open={winningThree.length === 3}>
          <Segment style={{ left: '42%', position: 'fixed', top: '40%', zIndex: 1000 }}>
            <Header>
              <Icon name="hand peace" />
              {activePlayer === 'playerX' ? playerO : playerX} wins!
            </Header>
            <p>Why not play another round?</p>
          </Segment>
        </Portal>
        <Portal open={drawPortalOpen}>
          <Segment style={{ left: '42%', position: 'fixed', top: '40%', zIndex: 1000 }}>
            <Header>
              <Icon name="game" />
              Draw game.
            </Header>
            <p>Why not play another round?</p>
          </Segment>
        </Portal>
      </Segment>
    );
  }
};


Board.propTypes = {
  playerX: PropTypes.string.isRequired,
  playerO: PropTypes.string.isRequired,
  activePlayer: PropTypes.string.isRequired,
  toggleActivePlayer: PropTypes.func.isRequired,
  toggleGameOn: PropTypes.bool.isRequired
};

export default Board;