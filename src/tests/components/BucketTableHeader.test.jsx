import React from 'react';
import renderer from 'react-test-renderer';
import BucketTableHeader from '../components/BucketTableHeader';


it('Displays bucket table header', () => {
  const rendered = renderer.create(
    <BucketTableHeader />,
  );
  expect(rendered.toJSON()).toMatchSnapshot();
});
