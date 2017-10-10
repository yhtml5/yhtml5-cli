import React from 'react'
import ReactDOM from 'react-dom'
import 'jest-enzyme'
import { shallow } from 'enzyme'
import { iterate } from 'leakage'
import { rendersWithoutCrashing } from 'yhtml5-test/case'
import App from '../src/Container/App/index'

// smoke test 
test('Components.App renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
})
rendersWithoutCrashing('Components.App', App)

// unit test
test('Components.App unit tests', () => {
  shallow(<App />)
})

// logic test
const appProps = {
  title: 'Welcome to React'
}

test('Components.App has welcome', () => {
  const wrapper = shallow(<App {...appProps} />)
  const welcome = <h2>Welcome to React</h2>
  // expect(wrapper.contains(welcome)).to.equal(true)
  expect(wrapper.contains(welcome)).toEqual(true)
  // jest-enzyme
  expect(wrapper).toContainReact(welcome)
})

// leakage test
test('Components.App does not leak when render', () => {
  iterate(() => {
    <App />
  })
})





