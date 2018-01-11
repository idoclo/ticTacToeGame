import React from 'react';
import { shallow } from 'enzyme';
import "isomorphic-fetch";
import PlayerForm from '../PlayerForm';


describe('PlayerForm', () => {
  const shallowComponent = shallow(<PlayerForm updatePlayer={() => {}} playerSymbol="O" handleModalClose={() => {}}/>);
  beforeEach(() => {
    const originalState = shallowComponent.state();
    shallowComponent.state().name = '';
    shallowComponent.state().status = null;
    shallowComponent.state().noStatusPortalOpen = false;
    shallowComponent.state().existingPlayerPortalOpen = false;
    shallowComponent.state().newPlayerPortalOpen = false;
  });

  it('renders correctly', () => {
    expect(shallowComponent).toMatchSnapshot();
  });

  it('calls handleExistingOrNew when Existing button is clicked', () => {
    // shallowComponent.instance().handleExistingOrNew = jest.fn();
    // const { handleExistingOrNew } = shallowComponent.instance();
    // expect(handleExistingOrNew).toHaveBeenCalledTimes(0);
    expect(shallowComponent.state().status).toEqual(null);
    shallowComponent.find('#buttonExisting').simulate('click', null, {value: 'existing'});
    expect(shallowComponent.state().status).toEqual('existing');
  });

  it('calls handleExistingOrNew when New button is clicked', () => {
    // shallowComponent.instance().handleExistingOrNew = jest.fn();
    // const { handleExistingOrNew } = shallowComponent.instance();
    // expect(handleExistingOrNew).toHaveBeenCalledTimes(1);
    expect(shallowComponent.state().status).toEqual(null);
    shallowComponent.find('#buttonNew').simulate('click', null, {value: 'new'});
    expect(shallowComponent.state().status).toEqual('new');
  });

  it('calls submitUsername when Enter button is clicked', () => {
    // shallowComponent.instance().submitUsername = jest.fn();
    // shallowComponent.instance().handleExistingOrNew = jest.fn();
    // const { submitUsername } = shallowComponent.instance();
    // expect(submitUsername).toHaveBeenCalledTimes(0);
    shallowComponent.find('#buttonSubmitUsername').simulate('click');
    expect(shallowComponent.state().noStatusPortalOpen).toEqual(true);
  });

  it('updates name state when a username is typed in the input field', () => {
    shallowComponent.find('#player-form-input').simulate('change', null, {value: 'Alistair'});
    expect(shallowComponent.state().name).toEqual('Alistair');
  });
});