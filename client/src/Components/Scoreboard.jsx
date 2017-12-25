import React, { Component } from 'react';
import { Header, Table } from 'semantic-ui-react';


class Scoreboard extends Component {
  constructor() {
    super();
    this.state = { topThreePlayers: [] }
  }

  componentWillMount() {
    console.log('fetch function goes here to get top three scoring players');
    this.setState({ topThreePlayers:
      [
        { name: 'Charlie', score: 100 },
        { name: 'Mandy', score: 60 },
        { name: 'Scott', score: 25 }
      ]
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