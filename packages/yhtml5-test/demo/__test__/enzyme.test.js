/**
 * author: yhtml5
 * reference: http://airbnb.io/enzyme/docs/api/shallow.html
 * description: common matcher
 */

import React from 'react';
import { shallow } from 'enzyme';
import 'jest-enzyme'
import App from '../src/Container/App/index'
import CheckboxWithLabel from '../src/container/todo/component/CheckboxWithLabel';

const appProps = {
  title: 'Welcome to React'
}

test('CheckboxWithLabel changes the text after click', () => {
  // Render a checkbox with label in the document
  const checkbox = shallow(
    <CheckboxWithLabel labelOn="On" labelOff="Off" />
  )

  expect(checkbox.text()).toEqual('Off')
  checkbox.find('input').simulate('change')
  expect(checkbox.text()).toEqual('On')
})

// logic test; mock props to running components
it('Components.App has welcome', () => {
  const wrapper = shallow(<App {...appProps} />)
  const welcome = <h2>Welcome to React</h2>
  // expect(wrapper.contains(welcome)).to.equal(true)
  expect(wrapper.contains(welcome)).toEqual(true)

  // jest-enzyme
  expect(wrapper).toContainReact(welcome)
})
