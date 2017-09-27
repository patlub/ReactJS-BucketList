import React from 'react';
import renderer from 'react-test-renderer';
import BucketList from '../../buckets/BucketList';


it('Displays BucketList component', () => {
  const rendered = renderer.create(
    <BucketList />,
  );
  expect(rendered.toJSON()).toMatchSnapshot();
});
