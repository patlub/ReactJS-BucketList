import React from 'react';
import { mount, shallow } from 'enzyme';
import ReactTestUtils from 'react-dom/test-utils'; // ES6
import { StaticRouter } from 'react-router';
import Login from '../../authentication/Login';
import renderer from 'react-test-renderer';


global.localStorage = {
  getItem: () => {},
};

describe('Component: Login', () => {
  it('Displays Login', () => {
    const rendered = renderer.create(
      <StaticRouter location="login" context={''}>
        <Login />
      </StaticRouter>,
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });

  it('updates state on input change', () => {
    const routerComponent = mount(
      <StaticRouter location="login" context={''}>
        <Login />
      </StaticRouter>,
    );
    const loginComponent = routerComponent.find('Login');
    const emailInput = loginComponent.find('[type="email"]');
    const passwordInput = loginComponent.find('[type="password"]');

    ReactTestUtils.Simulate.change(emailInput.getDOMNode(), { target: { name: 'email', value: 'patrick@gmail.com' } });
    ReactTestUtils.Simulate.change(passwordInput.getDOMNode(), { target: { name: 'password', value: 'patrick' } });
    expect(routerComponent.find('Login').nodes[0].state.email).toEqual('patrick@gmail.com');
    expect(routerComponent.find('Login').nodes[0].state.password).toEqual('patrick');
  });
});

