import React, { Component } from 'react';
import { Header, Icon, Form, Button, Portal, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Avatar from './Avatar';
import avatars from './playerAvatars';


class PlayerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      status: null,
      noStatusPortalOpen: false,
      existingPlayerPortalOpen: false,
      newPlayerPortalOpen: false,
      selectedAvatarIndex: null
    };
    this.handleExistingOrNew = this.handleExistingOrNew.bind(this);
    this.handleUsernameInput = this.handleUsernameInput.bind(this);
    this.submitUsername = this.submitUsername.bind(this);
    this.handleExistingPlayerPortalClose = this.handleExistingPlayerPortalClose.bind(this);
    // this.handleNoStatusPortalClose = this.handleNoStatusPortalClose.bind(this);
    this.handleNewPlayerPortalClose = this.handleNewPlayerPortalClose.bind(this);
    this.selectAvatar = this.selectAvatar.bind(this);
  }

  handleExistingOrNew(event, { value }) {
    this.setState({ status: value });
  }

  handleUsernameInput(event, { value }) {
    this.setState({ name: value });
  }

  handleExistingPlayerPortalClose() {
    this.setState({ existingPlayerPortalOpen: false });
  }

  // handleNoStatusPortalClose() {
  //   console.log('handleNoStatusPortalClose invoked BEFORE', this.state.noStatusPortalOpen);
  //   this.setState({ noStatusPortalOpen: false });
  //   console.log('handleNoStatusPortalClose invoked AFTER', this.state.noStatusPortalOpen);
  // }

  handleNewPlayerPortalClose() {
    this.setState({ newPlayerPortalOpen: false });
  }

  selectAvatar(index) {
    this.setState({ selectedAvatarIndex: index });
  }

  submitUsername() {
    const { name, status, selectedAvatarIndex } = this.state;
    const { playerSymbol, handleModalClose, updatePlayer } = this.props;
    if (!status) {
      this.setState({ noStatusPortalOpen: true });
      // window.alert('Need to select existing or new player mate!');
    }

    const myHeaders = {
      'Accept': 'application/json, text/plain, */*',
      'content-type': 'application/json'
    };

    if (status === 'existing') {
      fetch(`/players/${name}`, { method: 'GET' })
      .then(res => {
        if (res.status === 400) {
          throw new Error('That usename does not exist in the db.');
        }
        return res.json()
      })
      .then(resJSON => {
        const { username, avatar } = resJSON;
        updatePlayer(username, avatar);
      })
      .then(() => {
        handleModalClose();
      })
      .catch(err => {
        this.setState({ newPlayerPortalOpen: true });
        console.error(`Error saving existing player: ${err}`); // eslint-disable-line no-console
      });
    }

    if (status === 'new') {
      const payload = {
        username: name,
        playerStatus: status,
        avatarIndex: selectedAvatarIndex,
        playerSymbol
      };
      const myInit = {
        method: status === 'existing' ? 'GET' : 'POST',
        headers: myHeaders,
        mode: 'cors',
        body: JSON.stringify(payload),
        json: true
      }
      fetch('/players/new', myInit)
      .then(res => {
        if (res.status === 405) {
          throw new Error('That username already exists in the db.');
        }
        return res.json()
      })
      .then(resJSON => {
        if (resJSON)
        updatePlayer(resJSON.username);
      })
      .then(() => {
        handleModalClose();
      })
      .catch(err => {
        this.setState({ existingPlayerPortalOpen: true });
        console.error(`That username already exists in the db: ${err}`); // eslint-disable-line no-console
      });
    }
  }

  render() {
    const { playerSymbol } = this.props;
    const {
      existingPlayerPortalOpen,
      noStatusPortalOpen,
      newPlayerPortalOpen,
      status,
      selectedAvatarIndex
    } = this.state;
    const iconName = playerSymbol === 'X' ? 'remove' : 'radio';
    let avatarSelection = null;

    if (status === 'new') {
      avatarSelection =
        <div className="avatarSelectionRow">
          {avatars.map((avatar, index) =>
            <Avatar key={avatar} index={index} src={avatar} selectAvatar={this.selectAvatar} selectedAvatarIndex={selectedAvatarIndex}/>
          )}
        </div>
    }

    return (
      <div className="player-form">
        <Header
          size="medium"
          className="player-form-item"
        >
          Please enter your details
          <Header.Subheader>
            You will be player <Icon name={iconName}/>
          </Header.Subheader>
        </Header>

        <Form>
          <Button.Group className="player-form-item">
            <Button
              id="buttonExisting"
              color="brown"
              value="existing"
              onClick={this.handleExistingOrNew}
            >
              Existing
            </Button>
            <Button.Or />
            <Button
              id="buttonNew"
              color="grey"
              value="new"
              onClick={this.handleExistingOrNew}
            >
              New
            </Button>
          </Button.Group>
          <Form.Input
            label="Username"
            placeholder="Enter username here ..."
            onChange={this.handleUsernameInput}
            className="player-form-item"
            id="player-form-input"
          />
          {avatarSelection}
        </Form>
        <Button
          onClick={this.submitUsername}
          className="player-form-item"
          id="buttonSubmitUsername"
        >
          Enter
        </Button>
        <Portal
          open={existingPlayerPortalOpen}
          onClose={this.handleExistingPlayerPortalClose}
        >
          <Segment style={{ left: '35%', position: 'fixed', top: '40%', zIndex: 1000, textAlign:'center' }}>
            <Header>
              <Icon name="warning" style={{color: 'red'}}/>
              That username already exists in the database.
            </Header>
            <p>Please select another username.</p>
          </Segment>
        </Portal>
        <Portal
          open={noStatusPortalOpen}
          onClose={this.handleNoStatusPortalClose}
        >
          <Segment style={{ left: '35%', position: 'fixed', top: '40%', zIndex: 1000, textAlign:'center' }}>
            <Header>
              <Icon name="warning" style={{color: 'red'}}/>
              Need to select existing or new player mate!
            </Header>
            <p>Please press one of the buttons to select.</p>
          </Segment>
        </Portal>
        <Portal
          open={newPlayerPortalOpen}
          // onClose={this.handleNewPlayerPortalClose}
        >
          <Segment style={{ left: '35%', position: 'fixed', top: '40%', zIndex: 1000, textAlign:'center' }}>
            <Header>
              <Icon name="warning" style={{color: 'red'}}/>
              That username does not exist in the database.
            </Header>
            <p>Please either select the New option or enter an existing username.</p>
          </Segment>
        </Portal>
      </div>
    );
  }
};


PlayerForm.propTypes = {
  updatePlayer: PropTypes.func.isRequired,
  playerSymbol: PropTypes.string.isRequired,
  handleModalClose: PropTypes.func.isRequired
};


export default PlayerForm;