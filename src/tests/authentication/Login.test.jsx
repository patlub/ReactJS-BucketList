import React from 'react';
import { mount } from 'enzyme';
import ReactTestUtils from 'react-dom/test-utils'; // ES6
import { StaticRouter } from 'react-router';
import Login from '../../authentication/Login';
import renderer from 'react-test-renderer';
import { baseURL } from '../../configs/config';

const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

// This sets the mock adapter on the default instance
const mock = new MockAdapter(axios);
// Mock Login POST request to /login
mock.onPost(`${baseURL}/auth/login`).reply(200, {
  users: [
    { status: 'success', token: 1 },
  ],
});

global.localStorage = {
  getItem: () => {},
  setItem: () => {},
};

describe('Component: Login', () => {
  const routerComponent = mount(
    <StaticRouter location="login" context={{}}>
      <Login />
    </StaticRouter>,
  );
  const loginComponent = routerComponent.find('Login');
  const emailInput = loginComponent.find('[type="email"]');
  const passwordInput = loginComponent.find('[type="password"]');

  it('Displays Login', () => {
    const rendered = renderer.create(
      <StaticRouter location="login" context={{}}>
        <Login />
      </StaticRouter>,
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });

  it('updates state on input change', () => {
    emailInput.simulate('change', { target: { name: 'email', value: 'patrick@gmail.com' } });
    passwordInput.simulate('change', { target: { name: 'password', value: 'patrick' } });
    expect(routerComponent.find('Login').nodes[0].state.email).toEqual('patrick@gmail.com');
    expect(routerComponent.find('Login').nodes[0].state.password).toEqual('patrick');
  });

  it('signs in user', () => {
    const loginButton = loginComponent.find('[type="submit"]');
    loginButton.simulate('submit');
  });
});

