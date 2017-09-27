import React from 'react';
import renderer from 'react-test-renderer';
import ItemList from '../../items/ItemList';

describe('Component AddItem', () => {
  it('Displays BucketList component', () => {
    const rendered = renderer.create(
      <ItemList />,
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });
});
