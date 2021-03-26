import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import { UserContext, ContextWrapper } from '../../user-context';

import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

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

describe('User Context tests', () => {
  it('renders ContextWrapper', () => {
    // wrapper.find('Input[type="email"]').simulate('change', {
    //   target: { name: 'email', value: 'test@email.com' },
    // });

    // expect(wrapper.exists()).toBe(true);

    // jest.spyOn(Login, 'useAppContext').mockImplementation(() => loggedin)
    wrapper = shallow(<ContextWrapper />);

    expect(wrapper.exists()).toBe(true);
  });
});

// describe('User name', () => {
//   it('renders correctly', () => {
//     const tree = renderer.create(<ContextWrapper />);
//     wrapper = shallow(<ContextWrapper value={true} />);

//     const provider = wrapper.find('UserContext.Provider');
//     // expect(provider.text().toBe('username'));
//   });
// });
