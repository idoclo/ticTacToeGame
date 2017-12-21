import React, { Component } from 'react';
import { Header, Icon, Form, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';


class PlayerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      status: null
    };
    this.handleExistingOrNew = this.handleExistingOrNew.bind(this);
    this.handleUsernameInput = this.handleUsernameInput.bind(this);
    this.submitUsername = this.submitUsername.bind(this);
  }

  handleExistingOrNew(event, { value }) {
    console.log(value);
    this.setState({ status: value });
  }

  handleUsernameInput(event, { value }) {
    const { updatePlayer } = this.props;
    console.log('handleUsernameInput', value);
    this.setState({ name: value });
    updatePlayer(value);
  }

  submitUsername() {
    const { name, status } = this.state;
    const { playerSymbol } = this.props;
    if (!status) {
      window.alert('Need to select existing or new player mate!');
    }

    const myHeaders = {
      'Accept': 'application/json, text/plain, */*',
      'content-type': 'application/json'
    };

    if (status === 'existing') {
      fetch(`/players/${name}`, { method: 'GET' })
      .then(res =>
        res.json()
      )
      .then(resJSON => {
        console.log(resJSON);
      })
      .catch(err => {
        console.error(`Error saving existing player: ${err}`);
      });
    }

    if (status === 'new') {
      const payload = {
        username: name,
        playerStatus: status,
        playerSymbol
      };
      console.log('payload to submit', payload);
      const myInit = {
        method: status === 'existing' ? 'GET' : 'POST',
        headers: myHeaders,
        mode: 'cors',
        body: JSON.stringify(payload),
        json: true
      }
      fetch('/players/new', myInit)
      .then(res =>
        res.json()
      )
      .then(resJSON => {
        console.log('Player username inserted to db!', resJSON);
      })
      .catch(err => {
        throw new Error('Error inserting player username', err);
      });
    }
  }

  render() {
    const { playerSymbol } = this.props;
    const iconName = playerSymbol === 'X' ? 'remove' : 'radio';
    return (
      <div className="player-form">
        <Header size="medium">
          Please enter your details
          <Header.Subheader>
            You will be player <Icon name={iconName}/>
          </Header.Subheader>
        </Header>

        <Form>
          <Button.Group>
            <Button color="brown" value="existing" onClick={this.handleExistingOrNew}>Existing</Button>
            <Button.Or />
            <Button color="grey" value="new" onClick={this.handleExistingOrNew}>New</Button>
          </Button.Group>
          <Form.Input label="Username" placeholder="Username" onChange={this.handleUsernameInput} />
        </Form>
        <Button onClick={this.submitUsername}>
          Enter
        </Button>
        </div>
    );
  }
};


PlayerForm.propTypes = {
  updatePlayer: PropTypes.func.isRequired,
  playerSymbol: PropTypes.string.isRequired
};


export default PlayerForm;