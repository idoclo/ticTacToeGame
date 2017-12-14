import React from 'react';
import PropTypes from 'prop-types';
import { Header, Image, Table, Icon } from 'semantic-ui-react'


const GameInfo = ({ player1, player2, activePlayer }) => {
  const player1Turn = activePlayer === 'player1';
  const player2Turn = activePlayer === 'player2';
  return (
    <div id="game-info-segment">
      <Table
        basic='very'
        celled
        collapsing
      >
        <Table.Header>
          <Table.Row className="game-info-row">
            <Table.HeaderCell>Player</Table.HeaderCell>
            <Table.HeaderCell>Piece</Table.HeaderCell>
            <Table.HeaderCell>It{"'"}s your turn</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row className="game-info-row">
            <Table.Cell>
              <Header size='small' image>
                <Image
                  src='/assets/images/lindsay.png'
                  rounded
                  size='mini'
                />
                <Header.Content>
                    {player1}
                  <Header.Subheader>Player 1</Header.Subheader>
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>
              X
            </Table.Cell>
            <Table.Cell>
              {player1Turn ? <Icon color="teal" name="arrow left" size="large"/> : null}
            </Table.Cell>
          </Table.Row>
          <Table.Row className="game-info-row">
            <Table.Cell>
              <Header size='small' image>
                <Image
                  src='/assets/images/matthew.png'
                  rounded
                  size='mini'
                />
                <Header.Content>
                    {player2}
                  <Header.Subheader>Player 2</Header.Subheader>
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>
              O
            </Table.Cell>
            <Table.Cell>
              {player2Turn ? <Icon color="teal" name="arrow left" size="large"/> : null}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};

GameInfo.propTypes = {
  player1: PropTypes.string.isRequired,
  player2: PropTypes.string.isRequired,
  activePlayer: PropTypes.string.isRequired
}

export default GameInfo;