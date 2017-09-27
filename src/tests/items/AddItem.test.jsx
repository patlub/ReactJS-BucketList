import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import AddItem from '../../items/AddItem';
import { baseURL } from '../../configs/config';

const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

jest.mock('react-notifications');

// This sets the mock adapter on the default instance
const mock = new MockAdapter(axios);
// Mock Login POST request to /login
mock.onPost(`${baseURL}/buckets/1/items`).reply(200, {
});

global.localStorage = {
  getItem: () => {},
  setItem: () => {},
};

describe('Component: Login', () => {
  const addItem = (param) => {};
  const addItemComponent = mount(<AddItem bucketId={1} addItem={addItem} />);
  const ItemNameInput = addItemComponent.find('[type="text"]');
  const addItemButton = addItemComponent.find('[type="submit"]');

  it('Displays AddItem component', () => {
    const rendered = renderer.create(
      <AddItem />,
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });
  it('updates state on input change', () => {
    ItemNameInput.simulate('change', { target: { name: 'item', value: 'Go to Nairobi' } });
    expect(addItemComponent.state().item).toEqual('Go to Nairobi');
  });
  it('Adds an Item', () => {
    addItemButton.simulate('submit');
  });
});
