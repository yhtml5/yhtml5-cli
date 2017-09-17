import React from 'react';
import ReactDOM from 'react-dom';
import { rendersWithoutCrashing } from 'yhtml5-test/case';
import App from './App';
import { shallow } from 'enzyme';
import 'jest-enzyme';

rendersWithoutCrashing('Components.App', App)

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('App unit tests', () => {
  shallow(<App />);
});

it('App has welcome', () => {
  const wrapper = shallow(<App />);
  const welcome = <h2>Welcome to React</h2>;
  // expect(wrapper.contains(welcome)).to.equal(true);
  expect(wrapper.contains(welcome)).toEqual(true);
  expect(wrapper).toContainReact(welcome)
});



