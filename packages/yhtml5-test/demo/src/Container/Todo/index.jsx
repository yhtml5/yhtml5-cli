import React from 'react';
import App from '../App/index';
import TodoApp from './TodoApp';

function TodoModule() {

  const appProps = {
    title: 'Welcome to React',
    
  }

  return (
    <App {...appProps} >
      <TodoApp />
    </App>
  )
}

export default TodoModule