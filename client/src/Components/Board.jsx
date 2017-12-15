import React, { Component } from 'react';
import { Segment, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Square from './Square';


class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(''),
      visible: true
    };
    this.handleSquareClick = this.handleSquareClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.toggleVisibility = this.toggleVisibility.bind(this);
  }

  handleSquareClick(index, piece) {
    const { squares } = this.state;
    squares[index] = piece;
    this.setState({ squares });
  }

  handleReset(event, { value }) {
    const myHeaders = {
      'Accept': 'application/json, text/plain, */*',
      'content-type': 'application/json'
    };
    const payload = { value };
    const myInit = {
      method: 'POST',
      headers: myHeaders,
      mode: 'cors',
      body: JSON.stringify(payload),
      json: true
    };
    fetch(`/game/${value}`, myInit)
    .then(res => res.json())
    .then(resJSON => {
      this.setState({ squares: resJSON });
    })
    .catch(err => {
      console.error('not able to fetch from /game', err);
    })
  }

  toggleVisibility() {
    this.setState({ visible: !this.state.visible });
  }

  render() {
    const { squares } = this.state;
    const filledSquareRegEx = /X|O/;
    const buttonTextVisible = filledSquareRegEx.test(squares) ? 'Reset' : 'Start';
    const buttonIconHidden = filledSquareRegEx.test(squares) ? 'repeat' : 'wizard';
    const buttonColour = filledSquareRegEx.test(squares) ? 'blue' : 'green';
    const { activePlayer } = this.props;
    return (
      <Segment id="board-segment">
        <div id="board">
          <div className="row">
            <Square value={squares[0]} index={0} clickMethod={this.handleSquareClick} activePlayer={activePlayer}/>
            <div className="top-column" />
            <Square value={squares[1]} index={1} clickMethod={this.handleSquareClick} activePlayer={activePlayer}/>
            <div className="top-column" />
            <Square value={squares[2]} index={2} clickMethod={this.handleSquareClick} activePlayer={activePlayer}/>
          </div>
          <div className="board-row" />
          <div className="row" id="center-row">
            <Square value={squares[3]} index={3} clickMethod={this.handleSquareClick} activePlayer={activePlayer}/>
            <div className="middle-column" />
            <Square value={squares[4]} index={4} clickMethod={this.handleSquareClick} activePlayer={activePlayer}/>
            <div className="middle-column" />
            <Square value={squares[5]} index={5} clickMethod={this.handleSquareClick} activePlayer={activePlayer}/>
          </div>
          <div className="board-row" />
          <div className="row">
            <Square value={squares[6]} index={6} clickMethod={this.handleSquareClick} activePlayer={activePlayer}/>
            <div className="bottom-column" />
            <Square value={squares[7]} index={7} clickMethod={this.handleSquareClick} activePlayer={activePlayer}/>
            <div className="bottom-column" />
            <Square value={squares[8]} index={8} clickMethod={this.handleSquareClick} activePlayer={activePlayer}/>
          </div>
        </div>
        <div className="button">
          <Button
            color={buttonColour}
            value="Reset"
            onClick={this.handleReset}
            animated="vertical"
          >
            <Button.Content visible>
              {buttonTextVisible}
            </Button.Content>
            <Button.Content hidden>
              <Icon name={buttonIconHidden} />
            </Button.Content>
          </Button>
        </div>
      </Segment>
    );
  }
};

Board.propTypes = {
  activePlayer: PropTypes.string.isRequired
}

export default Board;