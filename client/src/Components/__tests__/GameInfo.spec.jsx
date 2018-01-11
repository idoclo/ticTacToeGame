import React from 'react';
import { shallow } from 'enzyme';
import GameInfo from '../GameInfo';


describe('GameInfo', () => {
  const shallowComponent = shallow(<GameInfo playerX="Apple" playerO="Strawberry" activePlayer="playerX"/>);

  test('GameInfo render correctly', () => {
    expect(shallowComponent).toMatchSnapshot();
  });
});