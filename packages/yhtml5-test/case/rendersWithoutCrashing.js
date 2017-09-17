import React from 'react'
import ReactDOM from 'react-dom';

const rendersWithoutCrashing = (name = '', Component) => {
  if (Object.prototype.toString.call(name) !== '[object String]' &&
    Object.prototype.toString.call(name) !== '[object Function]') {
    throw 'The function rendersWithoutCrashing receives [name:string, Component:function] as arguments'
  }
  it(`${name} renders without crashing`, () => {
    const div = document.createElement('div')
    ReactDOM.render(<Component />, div)
  })
}

export {
  rendersWithoutCrashing,
}
