import React from 'react';
import PropTypes from 'prop-types';
import { Header, Image, Table, Icon } from 'semantic-ui-react'


const GameInfo = ({ playerX, playerO, activePlayer }) => {
  const playerXTurn = activePlayer === 'playerX';
  const playerOTurn = activePlayer === 'playerO';
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
                    {playerX}
                  <Header.Subheader>Player X</Header.Subheader>
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>
              X
            </Table.Cell>
            <Table.Cell>
              {playerXTurn ? <Icon color="teal" name="arrow left" size="large"/> : null}
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
                    {playerO}
                  <Header.Subheader>Player O</Header.Subheader>
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>
              O
            </Table.Cell>
            <Table.Cell>
              {playerOTurn ? <Icon color="teal" name="arrow left" size="large"/> : null}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};

GameInfo.propTypes = {
  playerX: PropTypes.string.isRequired,
  playerO: PropTypes.string.isRequired,
  activePlayer: PropTypes.string.isRequired
}

export default GameInfo;