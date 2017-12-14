import React, { Component } from 'react';
import { Segment, Button } from 'semantic-ui-react';
import Square from './Square';


class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
    this.handleSquareClick = this.handleSquareClick.bind(this);
  }

  handleSquareClick(index, piece) {
    const { squares } = this.state;
    squares[index] = piece;
    this.setState({ squares });
  }

  render() {
    const { squares } = this.state;
    const filledSquareRegEx = /X|O/;
    const buttonText = filledSquareRegEx.test(squares) ? 'Reset' : 'Start';
    const buttonColour = filledSquareRegEx.test(squares) ? 'blue' : 'green';
    return (
      <Segment id="board-segment">
        <div id="board">
          <div className="row">
            <Square value={squares[0]} index={0} clickMethod={this.handleSquareClick}/>
            <div className="top-column" />
            <Square value={squares[1]} index={1} clickMethod={this.handleSquareClick}/>
            <div className="top-column" />
            <Square value={squares[2]} index={2} clickMethod={this.handleSquareClick}/>
          </div>
          <div className="board-row" />
          <div className="row" id="center-row">
            <Square value={squares[3]} index={3} clickMethod={this.handleSquareClick}/>
            <div className="middle-column" />
            <Square value={squares[4]} index={4} clickMethod={this.handleSquareClick}/>
            <div className="middle-column" />
            <Square value={squares[5]} index={5} clickMethod={this.handleSquareClick}/>
          </div>
          <div className="board-row" />
          <div className="row">
            <Square value={squares[6]} index={6} clickMethod={this.handleSquareClick}/>
            <div className="bottom-column" />
            <Square value={squares[7]} index={7} clickMethod={this.handleSquareClick}/>
            <div className="bottom-column" />
            <Square value={squares[8]} index={8} clickMethod={this.handleSquareClick}/>
          </div>
        </div>
        <div className="button">
          <Button color={buttonColour}>
            {buttonText}
          </Button>
        </div>
      </Segment>
    );
  }
};

export default Board;