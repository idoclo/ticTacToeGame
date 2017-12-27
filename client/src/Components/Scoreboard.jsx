import React, { Component } from 'react';
import { Header, Table } from 'semantic-ui-react';


class Scoreboard extends Component {
  constructor() {
    super();
    this.state = { topThreePlayers: [] }
  }

  componentWillMount() {
    fetch('/players/', { method: 'GET' })
    .then(playersInfo => playersInfo.json())
    .then(resJSON => {
      console.log('info on players', resJSON);
      const playersInfo = resJSON.slice();
      let first;
      let second;
      let third;
      let tempIndex;
      // First place
      playersInfo.forEach((player, index) => {
        if (!first || player.score > first.score) {
          first = player;
          tempIndex = index;
        }
      });
      // Slice out first player
      playersInfo.splice(tempIndex, 1);
      // Second place
      playersInfo.forEach((player, index) => {
        if (!second || player.score > second.score) {
          second = player;
          tempIndex = index;
        }
      });
      // Slice out second player
      playersInfo.splice(tempIndex, 1);
      // Third place
      playersInfo.forEach((player, index) => {
        if (!third || player.score > third.score) {
          third = player;
          tempIndex = index;
        }
      });

      this.setState({ topThreePlayers: [
          { name: first.username, score: first.score },
          { name: second.username, score: second.score },
          { name: third.username, score: third.score }
        ]
      })
    })
    .catch(err => {
      console.error('Unable to get all players info', err);
    });
  }

  componentDidMount() {
    const { topThreePlayers } = this.state;
    console.log('playa', topThreePlayers);
  }

  render() {
    const { topThreePlayers } = this.state;
    return (
      <div>
        <Header size="small">
          Top three players
        </Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Player</Table.HeaderCell>
              <Table.HeaderCell>Score</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {topThreePlayers.map(player => (
              <Table.Row>
                <Table.Cell>{player.name}</Table.Cell>
                <Table.Cell>{player.score}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  }
};

export default Scoreboard;