import request from './request';

const TODO_URL = 'https://api.parse.com/1/classes/Todo';

function merge(...objs) {
  return Object.assign({}, ...objs);
}

// types

export const FETCH_TODOS_REQUEST = 'FETCH_TODOS_REQUEST';
export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS';

export const CREATE_TODO_REQUEST = 'CREATE_TODO_REQUEST';
export const CREATE_TODO_SUCCESS = 'CREATE_TODO_SUCCESS';

export const UPDATE_TODO_REQUEST = 'UPDATE_TODO_REQUEST';
export const UPDATE_TODO_SUCCESS = 'UPDATE_TODO_SUCCESS';

// creators

export function fetchTodosRequest() {
  return {type: FETCH_TODOS_REQUEST};
}

export function fetchTodosSuccess(json) {
  return {type: FETCH_TODOS_SUCCESS, json};
}

export function createTodoRequest(todo) {
  return {type: CREATE_TODO_REQUEST, todo}
}

export function createTodoSuccess(json) {
  return {type: CREATE_TODO_SUCCESS, json}
}

export function updateTodoRequest(todo) {
  return {type: UPDATE_TODO_REQUEST, todo};
}

export function updateTodoSuccess(todo) {
  return {type: UPDATE_TODO_SUCCESS, todo};
}

// async

export function fetchTodos() {
  return function(dispatch) {
    dispatch(fetchTodosRequest());
    return request.get(TODO_URL)
      .then(resp   => resp.json())
      .then(json   => fetchTodosSuccess(json))
      .then(action => dispatch(action));
  }
}

export function createTodo(todo) {
  return function(dispatch) {
    dispatch(createTodoRequest(todo));
    return request.post(TODO_URL, todo)
      .then(resp   => resp.json())
      .then(json   => merge(todo, json))
      .then(todo   => createTodoSuccess(todo))
      .then(action => dispatch(action));
  }
}

export function updateTodo(todo) {
  return function(dispatch) {
    dispatch(updateTodoRequest(todo))
    return request.put(`${TODO_URL}/${todo.objectId}`, todo)
      .then(resp   => resp.json())
      .then(json   => merge(todo, json))
      .then(todo   => updateTodoSuccess(todo))
      .then(action => dispatch(action));
  }
}
