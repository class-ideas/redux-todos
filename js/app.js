import React, { Component } from 'react';
import { connect } from 'react-redux';
import { completeTodo, resetTodo, saveTodo } from './data/actions';
import Todos from './todos';
import IconButton from './icon_button';

class App extends Component {
  render() {
    const { dispatch, todos, addingNewTodo } = this.props;
    const newTodo = event => {
      event.preventDefault();
      let todoTitle = this.refs.newTodo.value;
      this.refs.newTodo.value = '';
      dispatch(saveTodo(todoTitle));
    }
    return (
      <div>
        <h1>Things Todo</h1>
        <form 
          onSubmit={newTodo}
          className="todo-add">
          <input ref="newTodo" placeholder="Add something todo"/>
          <IconButton icon="plus" spin={addingNewTodo}/>
        </form>
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
    todos: state.todos,
    addingNewTodo: state.addingNewTodo
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(App);
