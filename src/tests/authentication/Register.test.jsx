import React from 'react';
import { mount } from 'enzyme';
import { StaticRouter } from 'react-router';
import renderer from 'react-test-renderer';
import Register from '../../authentication/Register';
import { baseURL } from '../../configs/config';
import register from "../../registerServiceWorker";

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
  const register = registerComponent.nodes[0];

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

    expect(register.state.name).toEqual('patrick');
    expect(register.state.email).toEqual('patrick@gmail.com');
    expect(register.state.password).toEqual('secret');
  });

  it('signs up user', () => {
    const registerButton = registerComponent.find('[type="submit"]');
    registerButton.simulate('submit');
  });
});

