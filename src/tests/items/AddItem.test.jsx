import React from 'react';
import renderer from 'react-test-renderer';
import AddBucket from '../../buckets/AddBucket';

global.localStorage = {
  getItem: () => {},
};

it('Displays AddBucket component', () => {
  const rendered = renderer.create(
    <AddBucket />,
  );
  expect(rendered.toJSON()).toMatchSnapshot();
});
