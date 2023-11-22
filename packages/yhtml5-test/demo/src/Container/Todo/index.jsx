import React from 'react';
import App from '../app/index';
import TodoApp from './component/TodoApp';
import CheckboxWithLabel from './component/CheckboxWithLabel';

function TodoModule() {

  const appProps = {
    title: 'Welcome to React',

  }
  const checkboxWithLabelProps = {
    labelOn: "On",
    labelOff: "Off"
  }

  return (
    <App {...appProps} >
      <TodoApp />
      <br/>
      <br/>
      <br/>
      <CheckboxWithLabel {...checkboxWithLabelProps} />
    </App>
  )
}

export default TodoModule
