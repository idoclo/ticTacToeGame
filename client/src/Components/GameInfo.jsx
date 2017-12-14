import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Header, Image, Table } from 'semantic-ui-react'


const GameInfo = ({ player1, player2, activePlayer }) => (
  <Segment id="game-info-segment">
    <Table basic='very' celled collapsing>
      <Table.Header>
        <Table.Row className="game-info-row">
          <Table.HeaderCell>Player</Table.HeaderCell>
          <Table.HeaderCell>Piece</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row className="game-info-row">
          <Table.Cell>
            <Header size='small' image>
              <Image src='/assets/images/lindsay.png' rounded size='mini' />
              <Header.Content>
                  {player1}
                <Header.Subheader>Player 1</Header.Subheader>
              </Header.Content>
            </Header>
          </Table.Cell>
          <Table.Cell>
            X
          </Table.Cell>
        </Table.Row>
        <Table.Row className="game-info-row">
          <Table.Cell>
            <Header size='small' image>
              <Image src='/assets/images/matthew.png' rounded size='mini' />
              <Header.Content>
                  {player2}
                <Header.Subheader>Player 2</Header.Subheader>
              </Header.Content>
            </Header>
          </Table.Cell>
          <Table.Cell>
            O
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  </Segment>
);

GameInfo.propTypes = {
  player1: PropTypes.string.isRequired,
  player2: PropTypes.string.isRequired,
  activePlayer: PropTypes.string.isRequired
}

export default GameInfo;