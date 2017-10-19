import React from 'react'
import ReactDOM from 'react-dom'
import App from '../src/Container/App/index'
import { rendersWithoutCrashing } from 'yhtml5-test/case'
import { shallow } from 'enzyme'
import 'jest-enzyme'
import { iterate } from 'leakage'

const appProps = {
  title: 'Welcome to React'
}

// smoke test; testing renders without crashing
it('Components.App renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App {...appProps} />, div)
})
rendersWithoutCrashing('Components.App', App)

// unit test
it('Components.App unit tests', () => { shallow(<App {...appProps} />) })

// logic test; mock props to running components
it('Components.App has welcome', () => {
  const wrapper = shallow(<App {...appProps} />)
  const welcome = <h2>Welcome to React</h2>
  // expect(wrapper.contains(welcome)).to.equal(true)
  expect(wrapper.contains(welcome)).toEqual(true)

  // jest-enzyme
  expect(wrapper).toContainReact(welcome)
})

// leakage test
xit('Components.App does not leak when render', () => {
  iterate(() => <App />)
})

// Focusing and Excluding Tests
xit('Components.App xit tests', () => { shallow(<App />) })

//fit('Components.App fit tests', () => { shallow(<App />) })









