import React from 'react';
import renderer from 'react-test-renderer';
import { StaticRouter } from 'react-router';
import { mount, shallow } from 'enzyme';
import Buckets from '../../buckets/Buckets';
// configs
import { baseURL } from '../../configs/config';

const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

// This sets the mock adapter on the default instance
const mock = new MockAdapter(axios);

// Mock buckets GET request to /buckets
let buckets = [{
  id: 1,
  name: 'John Smith',
  desc: 'cities',
  date_added: '20-09-17',
  user_id: 1,
}];
mock.onGet(`${baseURL}/buckets`).reply(200, buckets);

global.localStorage = {
  getItem: () => true,
  setItem: () => {},
};

global.map = () => {};

describe('Component: Buckets', () => {
  const routerComponent = mount(
    <StaticRouter location="buckets" context={{ Buckets }}>
      <Buckets />
    </StaticRouter>,
  );
  const bucketsComponent = routerComponent.find('Buckets').nodes[0];
  it('Displays Buckets component', () => {
    const rendered = renderer.create(
      <StaticRouter context={{}}>
        <Buckets />
      </StaticRouter>,
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });
  it('has initial state in constructor', () => {
    expect(bucketsComponent.state.buckets).toEqual(buckets);
    expect(bucketsComponent.state.items).toEqual([]);
    expect(bucketsComponent.state.bucketId).toEqual('');
    expect(bucketsComponent.state.bucketClicked).toEqual(false);
  });
  it('can add bucket', () => {
    buckets = {
      id: 2,
      name: 'Another Bucket',
      desc: 'another desc',
      date_added: '20-09-17',
      user_id: 1,
    };
    expect(bucketsComponent.state.buckets.length).toEqual(1);
    bucketsComponent.addBucket(buckets);
    expect(bucketsComponent.state.buckets.length).toEqual(2);
  });
  it('can update bucket', () => {
    bucketsComponent.updateBuckets(2, 'new name', 'new desc');
    expect(bucketsComponent.state.buckets[1].name).toEqual('new name');
    expect(bucketsComponent.state.buckets[1].desc).toEqual('new desc');
  });
  it('can delete bucket', () => {
    expect(bucketsComponent.state.buckets.length).toEqual(2);
    bucketsComponent.deleteBucket(2);
    expect(bucketsComponent.state.buckets.length).toEqual(1);
  });
});
