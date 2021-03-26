import React, { createContext, useContext } from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, mount } from 'enzyme';
import ShallowRenderer from 'react-test-renderer/shallow';
import { UserContext } from '../../user-context';

import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Login, { useAppContext } from '../../pages/Login/index';

configure({ adapter: new Adapter() });

let wrapper = null;
let realUseContext;
let useContextMock;
beforeEach(() => {
  // setup a DOM element as a render target
  realUseContext = React.useContext;
  useContextMock = React.useContext = jest.fn();
});

afterEach(() => {
  // cleanup on exiting
  React.useContext = realUseContext;
});
// wrapper = shallow(<Login />);
describe('User Context tests', () => {
  it('renders ContextWrapper', () => {
    // wrapper.find('Input[type="email"]').simulate('change', {
    //   target: { name: 'email', value: 'test@email.com' },
    // });

    // expect(wrapper.exists()).toBe(true);

    // jest.spyOn(Login, 'useAppContext').mockImplementation(() => loggedin)
    wrapper = shallow(<Login />);

    expect(wrapper.exists()).toBe(true);
  });
});

// it('App loads with initial state of 0', () => {
//   const { container } = render(<Login />);
//   const countValue = getByTestId(container, 'countvalue');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });
