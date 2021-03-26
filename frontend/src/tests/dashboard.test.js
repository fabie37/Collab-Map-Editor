import React from 'react';
import renderer from 'react-test-renderer';
import Dashboard from '../pages/Dashboard';
//import Link​​ from 'react-router-dom/Link';
let BrowserRouter = require('react-router-dom').BrowserRouter;
let Link = require('react-router-dom').Link;
let Route = require('react-router-dom').Route;
require('regenerator-runtime/runtime');

test('Dashboard renders correctly', () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <Route path="/" exact component={Dashboard} />
      </BrowserRouter>
    )
    .toJSON();
  // put the existing a link here instead of creating a sample facebook one
  expect(tree).toMatchSnapshot();
});
