import request from './request';

const TODO_URL = 'https://api.parse.com/1/classes/Todo';

function merge(...objs) {
  return Object.assign({}, ...objs);
}

// types

export const FETCH_TODOS_REQUEST = 'FETCH_TODOS_REQUEST';
export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS';

export const SAVE_TODO_REQUEST = 'SAVE_TODO_REQUEST';
export const SAVE_TODO_SUCCESS = 'SAVE_TODO_SUCCESS';

export const COMPLETE_TODO_REQUEST = 'COMPLETE_TODO_REQUEST';
export const COMPLETE_TODO_SUCCESS = 'COMPLETE_TODO_SUCCESS';

export const RESET_TODO_REQUEST = 'RESET_TODO_REQUEST';
export const RESET_TODO_SUCCESS = 'RESET_TODO_SUCCESS';

// creators

export function fetchTodosRequest() {
  return {type: FETCH_TODOS_REQUEST};
}

export function fetchTodosSuccess(json) {
  return {type: FETCH_TODOS_SUCCESS, json};
}

export function saveTodoRequest(todo) {
  return {type: SAVE_TODO_REQUEST, todo}
}

export function saveTodoSuccess(json) {
  return {type: SAVE_TODO_SUCCESS, json}
}

export function completeTodoRequest(todo) {
  return {type: COMPLETE_TODO_REQUEST, todo};
}

export function completeTodoSuccess(todo) {
  return {type: COMPLETE_TODO_SUCCESS, todo};
}

export function resetTodoRequest(todo) {
  return {type: RESET_TODO_REQUEST, todo};
}

export function resetTodoSuccess(todo) {
  return {type: RESET_TODO_SUCCESS, todo};
}

// async

export function fetchTodos() {
  return function(dispatch) {
    dispatch(fetchTodosRequest());
    return request.get(TODO_URL)
      .then(response => response.json())
      .then(json => dispatch(fetchTodosSuccess(json)));
  }
}

export function saveTodo(title) {
  return function(dispatch) {
    dispatch(saveTodoRequest({title}));
    return request.post(TODO_URL, {title})
      .then(response => response.json())
      .then(json => dispatch(saveTodoSuccess(json)));
  }
}

export function completeTodo(todo) {
  return function(dispatch) {
    dispatch(completeTodoRequest(todo));
    let newTodo = merge(todo, {completeAt: new Date()});
    return request.put(`${TODO_URL}/${todo.objectId}`, newTodo)
      .then(response => response.json())
      .then(json => dispatch(completeTodoSuccess(merge(todo, json))));
  }
}

export function resetTodo(todo) {
  return function(dispatch) {
    dispatch(resetTodoRequest(todo));
    let newTodo = merge(todo, {completeAt: null});
    return request.put(`${TODO_URL}/${todo.objectId}`, newTodo)
      .then(response => response.json())
      .then(json => dispatch(resetTodoSuccess(merge(todo, json))));
  }
}
