import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import AddBucket from '../../buckets/AddBucket';
import { baseURL } from '../../configs/config';

jest.mock('react-notifications');

const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

// This sets the mock adapter on the default instance
const mock = new MockAdapter(axios);
// Mock Login POST request to /login
mock.onPost(`${baseURL}/buckets`).reply(200, {
});

global.localStorage = {
  getItem: () => {},
  setItem: () => {},
};

describe('Component: Login', () => {
  const addBucket = (param) => {};
  const addBucketComponent = mount(<AddBucket addBucket={addBucket} />);
  const bucketNameInput = addBucketComponent.find('[type="text"]').at(0);
  const bucketDescInput = addBucketComponent.find('[type="text"]').at(1);
  const addBucketButton = addBucketComponent.find('[type="submit"]');

  it('Displays AddBucket component', () => {
    const rendered = renderer.create(
      <AddBucket />,
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });
  it('updates state on input change', () => {
    bucketNameInput.simulate('change', { target: { name: 'name', value: 'Travel' } });
    bucketDescInput.simulate('change', { target: { name: 'desc', value: 'cities' } });
    expect(addBucketComponent.state().name).toEqual('Travel');
    expect(addBucketComponent.state().desc).toEqual('cities');
  });
  it('Adds a bucket', () => {
    addBucketButton.simulate('submit');
  });
});
