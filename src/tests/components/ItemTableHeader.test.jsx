import React from 'react';
import renderer from 'react-test-renderer';
import ItemTableHeader from '../../components/ItemTableHeader';


it('Displays item table header', () => {
  const rendered = renderer.create(
    <ItemTableHeader />,
  );
  expect(rendered.toJSON()).toMatchSnapshot();
});
