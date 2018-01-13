import React from 'react';
import PropTypes from 'prop-types';
import { Header, Image, Table, Icon } from 'semantic-ui-react';
import avatars from './playerAvatars';


const GameInfo = ({ playerX, playerXAvatarIndex, playerO, playerOAvatarIndex, activePlayer }) => {
  const playerXTurn = activePlayer === 'playerX';
  const playerOTurn = activePlayer === 'playerO';
  return (
    <div id="game-info-segment">
      <Header size="small">
        Current game
      </Header>
      <Table celled>
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
                  src={avatars[playerXAvatarIndex]}
                  rounded
                  size='mini'
                />
                <Header.Content>
                  {playerX}
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>
              <Icon name="remove" />
            </Table.Cell>
            <Table.Cell>
              {playerXTurn ? <Icon color="teal" name="arrow left" size="large"/> : null}
            </Table.Cell>
          </Table.Row>
          <Table.Row className="game-info-row">
            <Table.Cell>
              <Header size='small' image>
                <Image
                  src={avatars[playerOAvatarIndex]}
                  rounded
                  size='mini'
                />
                <Header.Content>
                  {playerO}
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>
              <Icon name="radio" />
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
  playerXAvatarIndex: PropTypes.number.isRequired, // eslint-disable-line
  playerO: PropTypes.string.isRequired,
  playerOAvatarIndex: PropTypes.number.isRequired, // eslint-disable-line
  activePlayer: PropTypes.string.isRequired
}

export default GameInfo;