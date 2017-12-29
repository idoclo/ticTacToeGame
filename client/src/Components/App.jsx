import React, { Component } from 'react';
import { Header, Segment, Modal, Button, Icon, Grid } from 'semantic-ui-react';
import GameInfo from './GameInfo';
import Board from './Board';
import PlayerForm from './PlayerForm';
import Scoreboard from './Scoreboard';


class App extends Component {
  constructor() {
    super();
    this.state = {
      playerX: '',
      playerO: '',
      activePlayer: 'playerX',
      modalOpenX: false,
      modalOpenO: false,
      gameOn: false
    };
    this.updatePlayerX = this.updatePlayerX.bind(this);
    this.updatePlayerO = this.updatePlayerO.bind(this);
    this.toggleActivePlayer = this.toggleActivePlayer.bind(this);
    this.handleModalOpenX = this.handleModalOpenX.bind(this);
    this.handleModalCloseX = this.handleModalCloseX.bind(this);
    this.handleModalOpenO = this.handleModalOpenO.bind(this);
    this.handleModalCloseO = this.handleModalCloseO.bind(this);
    this.toggleGameOn = this.toggleGameOn.bind(this);
  }


  updatePlayerX(pX) {
    this.setState({ playerX: pX });
  }

  updatePlayerO(pO) {
    this.setState({ playerO: pO });
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

  toggleGameOn(boolean) {
    this.setState({ gameOn: boolean });
  }

  render() {
    const { playerX, playerO, activePlayer, modalOpenX, modalOpenO, gameOn } = this.state;
    const board = (playerX.length && playerO.length) ?
      <Board
        playerX={playerX}
        playerO={playerO}
        activePlayer={activePlayer}
        toggleActivePlayer={this.toggleActivePlayer}
        toggleGameOn={this.toggleGameOn}
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
              <div
                className="button"
                onClick={this.handleModalOpenX}
                role="presentation"
              >
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
              <div
                className="button"
                onClick={this.handleModalOpenO}
                role="presentation"
              >
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
          <Grid columns={2} divided>
            <Grid.Column>
              <GameInfo
                playerX={playerX}
                playerO={playerO}
                activePlayer={activePlayer}
              />
            </Grid.Column>
            <Grid.Column>
              <Scoreboard gameOn={gameOn}/>
            </Grid.Column>
          </Grid>
        </Segment>
        {board}
      </div>
    );
  }
}

export default App;