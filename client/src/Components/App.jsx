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
      modalOpenX: false,
      modalOpenO: false
    };
    this.updatePlayerX = this.updatePlayerX.bind(this);
    this.updatePlayerO = this.updatePlayerO.bind(this);
    this.toggleActivePlayer = this.toggleActivePlayer.bind(this);
    this.handleModalOpenX = this.handleModalOpenX.bind(this);
    this.handleModalCloseX = this.handleModalCloseX.bind(this);
    this.handleModalOpenO = this.handleModalOpenO.bind(this);
    this.handleModalCloseO = this.handleModalCloseO.bind(this);
  }

  // componentWillMount() {
  //   this.setState({
  //     playerX: 'Chris',
  //     playerO: 'Allen'
  //   });
  // }

  updatePlayerX(player_X) {
    this.setState({ playerX: player_X });
  }

  updatePlayerO(player_O) {
    this.setState({ playerO: player_O });
  }

  toggleActivePlayer(newActivePlayer) {
    this.setState({ activePlayer: newActivePlayer });
  }

  handleModalOpenX() {
    this.setState({ modalOpenX: true });
  }

  handleModalCloseX() {
    this.setState({ modalOpenX: false });
  }

  handleModalOpenO() {
    this.setState({ modalOpenO: true });
  }

  handleModalCloseO() {
    this.setState({ modalOpenO: false });
  }

  render() {
    const { playerX, playerO, activePlayer, gameId, modalOpenX, modalOpenO } = this.state;
    const board = (playerX.length && playerO.length) ?
      <Board
        playerX={playerX}
        playerO={playerO}
        activePlayer={activePlayer}
        toggleActivePlayer={this.toggleActivePlayer}
      /> :
      null;

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
              <div className="button" onClick={this.handleModalOpenX}>
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
            open={modalOpenX}
            onClose={this.handleModalCloseX}
          >
            <PlayerForm
              updatePlayer={this.updatePlayerX}
              playerSymbol="X"
              handleModalClose={this.handleModalCloseX}
            />
          </Modal>
          <Modal
            trigger={
              <div className="button" onClick={this.handleModalOpenO}>
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
            open={modalOpenO}
            onClose={this.handleModalCloseO}
          >
            <PlayerForm
              updatePlayer={this.updatePlayerO}
              playerSymbol="O"
              handleModalClose={this.handleModalCloseO}
            />
          </Modal>
        </Segment>
        <Segment id="info-and-scoreboard">
          <GameInfo
            playerX={playerX}
            playerO={playerO}
            activePlayer={activePlayer}
          />
        </Segment>
        {board}
      </div>
    );
  }
}

export default App;