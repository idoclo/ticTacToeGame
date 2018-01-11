import React from 'react';
import { shallow } from 'enzyme';
import Square from '../Square';


describe('Square', () => {
  const shallowComponent = shallow(<Square value="X" index={0} clickMethod={() => {}} activePlayer="playerX" toggleActivePlayer={() => {}} gameId={10} winner={false}/>);

  it('renders correctly', () => {
    expect(shallowComponent).toMatchSnapshot();
  });

  it('calls handleClick when this Square is clicked on', () => {
    shallowComponent.instance().handleClick = jest.fn();
    const { handleClick } = shallowComponent.instance();
    expect(handleClick).toHaveBeenCalledTimes(0);
    shallowComponent.simulate('click', 1);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});