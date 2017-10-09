import React from 'react'
import ReactDOM from 'react-dom'
import { rendersWithoutCrashing } from 'yhtml5-test/case'
import { shallow } from 'enzyme'
import 'jest-enzyme'
import App from '../src/Components/App'

// Components test 

test('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
})

rendersWithoutCrashing('Components.App', App)

test('App unit tests', () => {
  shallow(<App />)
})

test('App has welcome', () => {
  const wrapper = shallow(<App />)
  const welcome = <h2>Welcome to React</h2>
  // expect(wrapper.contains(welcome)).to.equal(true)
  expect(wrapper.contains(welcome)).toEqual(true)
  expect(wrapper).toContainReact(welcome)
})


