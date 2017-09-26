import React from 'react';
import { mount, shallow } from 'enzyme';
import ReactTestUtils from 'react-dom/test-utils'; // ES6
import { StaticRouter } from 'react-router';
import renderer from 'react-test-renderer';
import Register from '../../authentication/Register';
import { baseURL } from '../../configs/config';

const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

// This sets the mock adapter on the default instance
const mock = new MockAdapter(axios);
// Mock Login POST request to /login
mock.onPost(`${baseURL}/auth/register`).reply(201, {
  users: [
    { status: 'success', token: 1 },
  ],
});


global.localStorage = {
  getItem: () => {},
  setItem: () => {},
};

describe('Component: Register', () => {
  const routerComponent = mount(
    <StaticRouter location="register" context={{}}>
      <Register />
    </StaticRouter>,
  );
  const registerComponent = routerComponent.find('Register');
  const nameInput = registerComponent.find('[type="text"]');
  const emailInput = registerComponent.find('[type="email"]');
  const passwordInput = registerComponent.find('[type="password"]');

  it('Displays Register', () => {
    const rendered = renderer.create(
      <StaticRouter location="register" context={{}}>
        <Register />
      </StaticRouter>,
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });

  it('updates state on input change', () => {
    nameInput.simulate('change', { target: { name: 'name', value: 'patrick' } });
    emailInput.simulate('change', { target: { name: 'email', value: 'patrick@gmail.com' } });
    passwordInput.simulate('change', { target: { name: 'password', value: 'secret' } });

    expect(routerComponent.find('Register').nodes[0].state.name).toEqual('patrick');
    expect(routerComponent.find('Register').nodes[0].state.email).toEqual('patrick@gmail.com');
    expect(routerComponent.find('Register').nodes[0].state.password).toEqual('secret');
  });

  it('signs up user', () => {
    const registerButton = registerComponent.find('[type="submit"]');
    registerButton.simulate('submit');
  });
});

