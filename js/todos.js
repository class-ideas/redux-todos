import React, {Component} from 'react';

class Todo extends Component {
  getIcon(want) {
    if (this.props.todo.isUpdating) {
      return 'fa fa-spin fa-spinner';
    } else {
      return `fa fa-${want}`;
    }
  }

  getAction() {
    if (this.props.todo.completeAt) {
      return (
        <button onClick={this.props.onUndo} className="undo">
          <i className={this.getIcon('undo')}/>
        </button>
      );
    } else {
      return (
        <button onClick={this.props.onRemove} className="remove">
          <i className={this.getIcon('close')}/>
        </button>
      );
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
        <span className={this.getTitleClass()}>{this.props.todo.title}</span>
        {this.getAction()}
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
