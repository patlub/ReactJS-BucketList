import React from 'react';
import { mount, shallow } from 'enzyme';
import ReactTestUtils from 'react-dom/test-utils'; // ES6
import { StaticRouter } from 'react-router';
import renderer from 'react-test-renderer';
import Register from '../../authentication/Register';


global.localStorage = {
  getItem: () => {},
};

describe('Component: Register', () => {
  it('Displays Register', () => {
    const rendered = renderer.create(
      <StaticRouter location="register" context={''}>
        <Register />
      </StaticRouter>,
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });

  it('updates state on input change', () => {
    const routerComponent = mount(
      <StaticRouter location="register" context={''}>
        <Register />
      </StaticRouter>,
    );
    const registerComponent = routerComponent.find('Register');
    const nameInput = registerComponent.find('[type="text"]');
    const emailInput = registerComponent.find('[type="email"]');
    const passwordInput = registerComponent.find('[type="password"]');

    ReactTestUtils.Simulate.change(nameInput.getDOMNode(), { target: { name: 'name', value: 'patrick' } });
    ReactTestUtils.Simulate.change(emailInput.getDOMNode(), { target: { name: 'email', value: 'patrick@gmail.com' } });
    ReactTestUtils.Simulate.change(passwordInput.getDOMNode(), { target: { name: 'password', value: 'secret' } });

    expect(routerComponent.find('Register').nodes[0].state.name).toEqual('patrick');
    expect(routerComponent.find('Register').nodes[0].state.email).toEqual('patrick@gmail.com');
    expect(routerComponent.find('Register').nodes[0].state.password).toEqual('secret');
  });
});

