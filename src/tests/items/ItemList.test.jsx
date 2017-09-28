import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import ItemList from '../../items/ItemList';
import { baseURL } from '../../configs/config';

jest.mock('react-notifications');

const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

// This sets the mock adapter on the default instance
const mock = new MockAdapter(axios);

// Mock update bucket PUT request to /buckets/1
mock.onPut(`${baseURL}/buckets/1/items/1`).reply(200, {
});

// Mock delete bucket DELETE request to /buckets/1
mock.onDelete(`${baseURL}/items/1`).reply(200, {
});

global.localStorage = {
  getItem: () => {},
  setItem: () => {},
};

global.confirm = () => true;

describe('Component: Login', () => {
  const props = {
    id: 1,
    name: 'Go to Nairobi',
    status: 'false',
    bucket_id: 1,
    updateItems: () => {},
    deleteItem: () => {},
  };
  const itemListComponent = mount(<ItemList {...props} />);
  const itemName = itemListComponent.find('td.main-name');
  const editIconBtn = itemListComponent.find('span.edit');
  const deleteIconBtn = itemListComponent.find('span.remove');

  it('Displays BucketList component', () => {
    const rendered = renderer.create(
      <ItemList />,
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });
  it('sets props to state', () => {
    expect(itemListComponent.state().isEditing).toEqual(false);
    expect(itemListComponent.state().name).toEqual('Go to Nairobi');
    expect(itemListComponent.state().status).toEqual('false');
  });
  it('sets isEditing state to true', () => {
    editIconBtn.simulate('click');
    expect(itemListComponent.state().isEditing).toEqual(true);
  });
  it('sets isEditing state to true', () => {
    editIconBtn.simulate('click');
    const cancelIconBtn = itemListComponent.find('span.cancel');
    cancelIconBtn.simulate('click');
    expect(itemListComponent.state().isEditing).toEqual(false);
  });
  it('sets isEditing state to false', () => {
    editIconBtn.simulate('click');
    const cancelIconBtn = itemListComponent.find('span.cancel');
    cancelIconBtn.simulate('click');
    expect(itemListComponent.state().isEditing).toEqual(false);
  });
  it('sets state on input changed', () => {
    editIconBtn.simulate('click');
    const itemNameInput = itemListComponent.find('[type="text"]');
    itemNameInput.simulate('change', { target: { name: 'name', value: 'New item is NewYork' } });
    expect(itemListComponent.state().name).toEqual('New item is NewYork');
  });
  it('saves on click save', () => {
    editIconBtn.simulate('click');
    const saveIconBtn = itemListComponent.find('span.save');
    saveIconBtn.simulate('click');
  });
  it('deletes on click delete', () => {
    deleteIconBtn.simulate('click');
  });
  it('fetches items on click bucket', () => {
    itemName.simulate('click');
  });
});
