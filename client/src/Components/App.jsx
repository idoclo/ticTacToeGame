import React, { Component } from 'react';
import { Header, Segment, Modal, Button } from 'semantic-ui-react';
import GameInfo from './GameInfo';
import Board from './Board';
import PlayerForm from './PlayerForm';


class App extends Component {
  constructor() {
    super();
    this.state = {
      playerX: '',
      playerXEmail: '',
      playerO: '',
      playerOEmail: '',
      activePlayer: 'playerX'
    };
    this.updatePlayerX = this.updatePlayerX.bind(this);
    this.updatePlayerXEmail = this.updatePlayerXEmail.bind(this);
    this.updatePlayerO = this.updatePlayerO.bind(this);
    this.updatePlayerOEmail = this.updatePlayerOEmail.bind(this);
    this.updateActivePlayer = this.updateActivePlayer.bind(this);
  }

  componentWillMount() {
    this.setState({
      playerX: 'Chris',
      playerO: 'Allen'
    });
  }

  updatePlayerX(playerX) {
    this.setState({ playerX });
  }

  updatePlayerXEmail(email) {
    this.setState({ playerXEmail: email });
  }

  updatePlayerO(playerO) {
    this.setState({ playerO });
  }

  updatePlayerOEmail(email) {
    this.setState({ playerOEmail: email });
  }

  updateActivePlayer(activePlayer) {
    this.setState({ activePlayer });
  }

  render() {
    const { playerX, playerO, activePlayer } = this.state;
    return (
      <div id="body">
        <Header size="huge" className="header">
          Tic Tac Toe
          <Header.Subheader>
            Challenge your mates to a classic game of noughts and crosses!
          </Header.Subheader>
        </Header>
        <Segment id="player-initiation-segment">
          <Modal
            trigger={
              <div className="button">
                <Button basic color="red">Player X</Button>
              </div>
            }
            size="small"
          >
            <PlayerForm updatePlayer={this.updatePlayerX} updatePlayerEmail={this.updatePlayerXEmail}/>
          </Modal>
          <Modal
            trigger={
              <div className="button">
                <Button basic color="yellow">Player O</Button>
              </div>
            }
            size="small"
          >
            <PlayerForm updatePlayer={this.updatePlayerO} updatePlayerEmail={this.updatePlayerOEmail}/>
          </Modal>
        </Segment>
        <Segment id="info-and-scoreboard">
          <GameInfo
            playerX={playerX}
            playerO={playerO}
            activePlayer={activePlayer}
          />
        </Segment>
        <Board activePlayer={activePlayer}/>
      </div>
    );
  }
}

export default App;