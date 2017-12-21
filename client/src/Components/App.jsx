import React, { Component } from 'react';
import { Header, Segment, Modal, Button, Icon } from 'semantic-ui-react';
import GameInfo from './GameInfo';
import Board from './Board';
import PlayerForm from './PlayerForm';


class App extends Component {
  constructor() {
    super();
    this.state = {
      playerX: '',
      playerO: '',
      activePlayer: 'playerX',
      // gameId: 0
    };
    this.updatePlayerX = this.updatePlayerX.bind(this);
    this.updatePlayerO = this.updatePlayerO.bind(this);
    this.updateActivePlayer = this.updateActivePlayer.bind(this);
    this.updateGameId = this.updateGameId.bind(this);
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

  updatePlayerO(playerO) {
    this.setState({ playerO });
  }

  updateActivePlayer(activePlayer) {
    this.setState({ activePlayer });
  }

  updateGameId(gameId) {
    console.log(`gameId: ${gameId}`);
    this.setState({ gameId });
  }

  render() {
    const { playerX, playerO, activePlayer, gameId, updateGameId } = this.state;
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
                <Button color="red" animated="fade">
                  <Button.Content visible>
                    Player <Icon name="remove" />
                  </Button.Content>
                  <Button.Content hidden>
                    Enter details
                  </Button.Content>
                </Button>
              </div>
            }
            size="mini"
            closeIcon
          >
            <PlayerForm updatePlayer={this.updatePlayerX} playerSymbol="X" />
          </Modal>
          <Modal
            trigger={
              <div className="button">
                <Button color="violet" animated="fade">
                  <Button.Content visible>
                    Player <Icon name="radio" />
                  </Button.Content>
                  <Button.Content hidden>
                    Enter details
                  </Button.Content>
                </Button>
              </div>
            }
            size="mini"
            closeIcon
          >
            <PlayerForm updatePlayer={this.updatePlayerO} playerSymbol="O" />
          </Modal>
        </Segment>
        <Segment id="info-and-scoreboard">
          <GameInfo
            playerX={playerX}
            playerO={playerO}
            activePlayer={activePlayer}
          />
        </Segment>
        <Board playerX={playerX} playerO={playerO} activePlayer={activePlayer} />
      </div>
    );
  }
}

export default App;