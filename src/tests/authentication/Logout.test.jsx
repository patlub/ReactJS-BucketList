import React from 'react';
import { shallow } from 'enzyme';
import Logout from '../../authentication/Logout';


global.localStorage = {
  removeItem: () => {},
};

describe('Component: Logout', () => {
  it('renders without exploding', () => {
    expect(
      shallow(
        <Logout />,
      ).length,
    ).toEqual(1);
  });
});

