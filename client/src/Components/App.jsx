import React, { Component } from 'react';
import { Header, Segment } from 'semantic-ui-react';
import GameInfo from './GameInfo';
import Board from './Board';


class App extends Component {
  constructor() {
    super();
    this.state = {
      player1: '',
      player2: '',
      activePlayer: 'player1'
    }
  }

  componentWillMount() {
    this.setState({
      player1: 'Chris',
      player2: 'Allen'
    });
  }

  render() {
    const { player1, player2, activePlayer } = this.state;
    return (
      <div id="body">
        <Header size="huge" className="header">
          Tic Tac Toe
          <Header.Subheader>
            Challenge your mates to a classic game of noughts and crosses!
          </Header.Subheader>
        </Header>
        <Segment id="info-and-scoreboard">
          <GameInfo
            player1={player1}
            player2={player2}
            activePlayer={activePlayer}
          />
        </Segment>
        <Board />
      </div>
    );
  }
}

export default App;