import React from 'react';
import { shallow } from 'enzyme';
import "isomorphic-fetch";
import Scoreboard from '../Scoreboard';


describe('Scoreboard', () => {
  const shallowComponent = shallow(<Scoreboard gameOn={false} />);

  test('Scoreboard renders correctly', () => {
    expect(shallowComponent).toMatchSnapshot();
  });
});