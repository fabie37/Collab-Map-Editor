import React from 'react';
import renderer from 'react-test-renderer';
import Profile from '../pages/Profile';
//import Link​​ from 'react-router-dom/Link';
let BrowserRouter = require('react-router-dom').BrowserRouter;
let Link = require('react-router-dom').Link;
let Route = require('react-router-dom').Route;

test('profile renders correctly', () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <Route path="/profile" exact component={Profile} />
      </BrowserRouter>
    )
    .toJSON();
  // put the existing a link here instead of creating a sample facebook one
  expect(tree).toMatchSnapshot();
});
