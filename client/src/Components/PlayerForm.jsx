import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import PropTypes from 'prop-types'


class PlayerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: '',
      email: ''
    };
    this.handleUsernameInput = this.handleUsernameInput.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
  }

  handleUsernameInput(event, { value }) {
    const { updatePlayer } = this.props;
    console.log('handleUsernameInput', value);
    updatePlayer(value);
  }

  handleEmailInput(event, { value }) {
    const { updatePlayerEmail } = this.props;
    console.log('handleEmailInput', value);
    updatePlayerEmail(value);
  }

  render() {
    return (
      <Form>
        <Form.Input label="Username" placeholder="Username" onChange={this.handleUsernameInput} />
        <Form.Input label="Email" placeholder="Email" onChange={this.handleEmailInput} />
      </Form>
    );
  }
};

PlayerForm.propTypes = {
  updatePlayer: PropTypes.func.isRequired,
  updatePlayerEmail: PropTypes.func.isRequired
};


export default PlayerForm;