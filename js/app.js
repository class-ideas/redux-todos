import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateTodo, createTodo } from './data/actions';
import Todos from './todos';
import IconButton from './icon_button';

function merge(...objs) {
  return Object.assign({}, ...objs);
}

class App extends Component {
  render() {
    const { dispatch, todos, pendingTodo } = this.props;
    
    const newTodo = event => {
      event.preventDefault();
      let title = this.refs.newTodo.value;
      this.refs.newTodo.value = '';
      dispatch(createTodo({title}));
    }
    
    const completeTodo = (todo) => {
      let updatedTodo = merge(todo, {
        completeAt: new Date()
      });
      dispatch(updateTodo(updatedTodo));
    }
    
    const resetTodo = (todo) => {
      let updatedTodo = merge(todo, {
        completeAt: null
      });
      dispatch(updateTodo(updatedTodo));
    }
    
    return (
      <div>
        <h1>Things Todo</h1>
       
        <form 
          onSubmit={newTodo}
          className="todo-add">
          
          <input 
            ref="newTodo"
            placeholder="Add something todo"/>
          
          <IconButton 
            icon="plus"
            spin={!!pendingTodo}/>
        </form>
        
        <Todos
          onComplete={completeTodo} 
          onReset={resetTodo} 
          todos={todos}/>
      </div>
    );
  }
}

// Which props do we want to inject
// Note: use https://github.com/faassen/reselect 
// for better performance.
function select(state) {
  return {
    todos: state.todos,
    pendingTodo: state.pendingTodo
  };
}

// Wrap the component to inject 
// `dispatch` and `state` into it
export default connect(select)(App);
