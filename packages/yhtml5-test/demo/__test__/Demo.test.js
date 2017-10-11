import React from 'react'
import ReactDOM from 'react-dom'
import App from '../src/Container/App/index'
import { isArrayNotEmpty, circular } from '../src/utils'

// smoke test; testing renders without crashing
import { rendersWithoutCrashing } from 'yhtml5-test/case'

it('Components.App renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
})
rendersWithoutCrashing('Components.App', App)

// unit test
import { shallow } from 'enzyme'

it('Components.App unit tests', () => {
  shallow(<App />)
})

it('util.validator.isArrayNotEmpty', () => {
  const values1 = [null, NaN, 1, '1', {}, [], () => { }]
  const values2 = [[1], [{}, []]]

  values1.forEach((value) => expect(isArrayNotEmpty(value)).toEqual(false))
  values2.forEach((value) => expect(isArrayNotEmpty(value)).toEqual(true))
})

// logic test; mock props to running components
import 'jest-enzyme'

const appProps = {
  title: 'Welcome to React'
}

it('Components.App has welcome', () => {
  const wrapper = shallow(<App {...appProps} />)
  const welcome = <h2>Welcome to React</h2>
  // expect(wrapper.contains(welcome)).to.equal(true)
  expect(wrapper.contains(welcome)).toEqual(true)

  // jest-enzyme
  expect(wrapper).toContainReact(welcome)
})

// leakage test
import { iterate } from 'leakage'

it('Components.App does not leak when render', () => {
  iterate(() => {
    <App />
  })
})

it('Components.App does not leak when render', () => {
  iterate(() => {
    circular()
  })
})

// Focusing and Excluding Tests
xit('Components.App xit tests', () => {
  shallow(<App />)
})

// fit('Components.App fit tests', () => {
//   shallow(<App />)
// })









