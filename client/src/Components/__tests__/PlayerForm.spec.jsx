import React from 'react';
import { shallow } from 'enzyme';
import configure from '../../testSetup';
import PlayerForm from '../PlayerForm';


describe('PlayerForm', () => {
  const shallowComponent = shallow(<PlayerForm updatePlayer={() => {}} playerSymbol="O" handleModalClose={() => {}}/>);

  test('PlayerForm renders correctly', () => {
    expect(shallowComponent).toMatchSnapshot();
  });
});