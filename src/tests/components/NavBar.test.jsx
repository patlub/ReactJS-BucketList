import React from 'react';
import renderer from 'react-test-renderer';
import NavBar from '../../components/NavBar';
import { StaticRouter } from 'react-router';


it('Displays NavBar', () => {
  const rendered = renderer.create(
    <StaticRouter location="logout" context={''}>
      <NavBar />
    </StaticRouter>,
  );
  expect(rendered.toJSON()).toMatchSnapshot();
});
