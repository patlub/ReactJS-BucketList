import React from 'react';
import renderer from 'react-test-renderer';
import { StaticRouter } from 'react-router';
import Buckets from '../../buckets/Buckets';
// configs
import { baseURL } from '../../configs/config';

const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

// This sets the mock adapter on the default instance
const mock = new MockAdapter(axios);

// Mock buckets GET request to /buckets
mock.onGet(`${baseURL}/buckets`).reply(200, {
  buckets: [
    { id: 1, name: 'John Smith', desc: 'cities', date_added: '20-09-17', user_id: 1 },
  ],
});

global.localStorage = {
  getItem: () => {},
};

it('Displays Buckets component', () => {
  const rendered = renderer.create(
    <StaticRouter context={{}}>
      <Buckets />
    </StaticRouter>,
  );
  expect(rendered.toJSON()).toMatchSnapshot();
});
