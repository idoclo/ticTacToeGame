import React from 'react';
import { shallow } from 'enzyme';
import "isomorphic-fetch";
import Board from '../Board';


describe('Board', () => {
  const shallowComponent = shallow(<Board playerX="Apple" playerO="Strawberry" activePlayer="playerX" toggleActivePlayer={() => {}} toggleGameOn={() => {}}/>);

  test('Board renders correctly', () => {
    expect(shallowComponent).toMatchSnapshot();
  });
});