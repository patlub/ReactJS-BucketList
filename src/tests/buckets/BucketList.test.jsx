import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import BucketList from '../../buckets/BucketList';
import { baseURL } from '../../configs/config';

jest.mock('react-notifications');

const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

// This sets the mock adapter on the default instance
const mock = new MockAdapter(axios);

// Mock update bucket PUT request to /buckets/1
mock.onPut(`${baseURL}/buckets/1`).reply(200, {
});

// Mock delete bucket DELETE request to /buckets/1
mock.onDelete(`${baseURL}/buckets/1`).reply(200, {
});

// Mock get items GET request to /items/1
mock.onGet(`${baseURL}/items/1`).reply(200, {
});

global.localStorage = {
  getItem: () => {},
  setItem: () => {},
};

global.confirm = () => true;

describe('Component: Login', () => {
  const props = {
    id: 1,
    name: 'Travel',
    desc: 'cities',
    updateBuckets: () => {},
    deleteBuckets: () => {},
    getItems: () => {},
  };
  const bucketListComponent = mount(<BucketList {...props} />);
  const bucketName = bucketListComponent.find('td.main-name');
  const editIconBtn = bucketListComponent.find('span.edit');
  const deleteIconBtn = bucketListComponent.find('span.remove');

  it('Displays BucketList component', () => {
    const rendered = renderer.create(
      <BucketList />,
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });
  it('sets props to state', () => {
    expect(bucketListComponent.state().isEditing).toEqual(false);
    expect(bucketListComponent.state().bucket).toEqual('Travel');
    expect(bucketListComponent.state().desc).toEqual('cities');
  });
  it('sets isEditing state to true', () => {
    editIconBtn.simulate('click');
    expect(bucketListComponent.state().isEditing).toEqual(true);
  });
  it('sets isEditing state to true', () => {
    editIconBtn.simulate('click');
    const cancelIconBtn = bucketListComponent.find('span.cancel');
    cancelIconBtn.simulate('click');
    expect(bucketListComponent.state().isEditing).toEqual(false);
  });
  it('sets isEditing state to false', () => {
    editIconBtn.simulate('click');
    const cancelIconBtn = bucketListComponent.find('span.cancel');
    cancelIconBtn.simulate('click');
    expect(bucketListComponent.state().isEditing).toEqual(false);
  });
  it('sets state on input changed', () => {
    editIconBtn.simulate('click');
    const bucketNameInput = bucketListComponent.find('[type="text"]').at(0);
    const bucketDescInput = bucketListComponent.find('[type="text"]').at(1);
    bucketNameInput.simulate('change', { target: { name: 'bucket', value: 'Food' } });
    bucketDescInput.simulate('change', { target: { name: 'desc', value: 'crabs' } });
    expect(bucketListComponent.state().bucket).toEqual('Food');
    expect(bucketListComponent.state().desc).toEqual('crabs');
  });
  it('saves on click save', () => {
    editIconBtn.simulate('click');
    const saveIconBtn = bucketListComponent.find('span.save');
    saveIconBtn.simulate('click');
  });
  it('deletes on click delete', () => {
    deleteIconBtn.simulate('click');
  });
  it('fetches items on click bucket', () => {
    bucketName.simulate('click');
  });
});
