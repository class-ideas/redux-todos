import React, { Component } from 'react';
import { connect } from 'react-redux';
import { completeTodo, resetTodo } from './data/actions';
import Todos from './todos';

class App extends Component {
  render() {
    const { dispatch, todos } = this.props;
    return (
      <div>
        <h1>Things Todo</h1>
        <Todos
          onComplete={(t) => dispatch(completeTodo(t))} 
          onReset={(t) => dispatch(resetTodo(t))} 
          todos={todos}/>
      </div>
    );
  }
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
  return {
    todos: state.todos
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(App);
