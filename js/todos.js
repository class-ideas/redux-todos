import React, {Component} from 'react';
import IconButton from './icon_button';

class Todo extends Component {
  getButton() {
    let spin = this.props.todo.isUpdating;
    if (this.props.todo.completeAt) {
      return <IconButton 
                className="undo"
                onClick={this.props.onUndo}
                icon="undo"
                spin={spin}/>;
    } else {
      return <IconButton 
                className="remove"
                onClick={this.props.onRemove}
                icon="close"
                spin={spin}/>;
    }
  }

  getTitleClass() {
    if (this.props.todo.completeAt) {
      return 'title complete';
    } else {
      return 'title';
    }
  }

  render() {
    return (
      <li className="todo">
        <span className={this.getTitleClass()}>
          {this.props.todo.title}
        </span>
        {this.getButton()}
      </li>
    );
  }
}

export default class Todos extends Component {
  getTodo(todo) {
    return (
      <Todo
        key={todo.objectId}
        onRemove={() => this.props.onComplete(todo)}
        onUndo={() => this.props.onReset(todo)}
        todo={todo}/>
    );
  }

  render() {
    return (
      <ul className="todo-list">
        {this.props.todos.map(this.getTodo.bind(this))}
      </ul>
    );
  }
}
