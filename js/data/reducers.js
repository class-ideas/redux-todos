import {
  SAVE_TODO_REQUEST, 
  SAVE_TODO_SUCCESS, 
  FETCH_TODOS_SUCCESS, 
  FETCH_TODOS_REQUEST,
  COMPLETE_TODO_REQUEST,
  COMPLETE_TODO_SUCCESS,
  RESET_TODO_REQUEST,
  RESET_TODO_SUCCESS
} from './actions';

function modifyTodo(state, {when, then}) {
  let todos = state.todos.slice().map((...args) => {
    if (when(...args)) {
      return then(...args);
    } else {
      return args[0];
    }
  });
  return Object.assign({}, state, {todos});
}

function merge(...objs) {
  return Object.assign({}, ...objs);
}

function handleActions(hash) {
  return function(state, action) {
    if (action.type in hash) {
      return hash[action.type](state, action);
    }
    else {
      return state;
    }
  }
}

function fetchTodos(state, action) {
  switch (action.type) {
    case FETCH_TODOS_REQUEST:
      return merge(state, {loading: true});
    break;
    
    case FETCH_TODOS_SUCCESS:
      return merge(state, {
        loading: false, 
        todos: action.json.results
      });
    break;
    
    default:
      return state;
    break;
  }
}

function saveTodo(state, action) {
  switch (action.type) {
    case SAVE_TODO_REQUEST:
      let todos = state.todos.slice();
      todos.push({
        title: action.title,
        objectId: null
      });
      return merge(state, {todos, addingNewTodo: true});
    break;
    
    case SAVE_TODO_SUCCESS:
      return merge(modifyTodo(state, {
        when: todo => !todo.objectId,
        then: todo => merge(todo, action.json)
      }), {addingNewTodo: false});
    break;
    
    default:
      return state;
    break;
  }
}

const completeTodo = handleActions({
  COMPLETE_TODO_REQUEST: (state, action) => {
    return modifyTodo(state, {
      when: todo => todo.objectId === action.todo.objectId,
      then: todo => merge(todo, {isUpdating: true})
    });
  },
  COMPLETE_TODO_SUCCESS: (state, action) => {
    return modifyTodo(state, {
      when: todo => todo.objectId === action.todo.objectId,
      then: todo => merge(todo, {isUpdating: false}, action.todo)
    });
  }
});

const resetTodo = handleActions({
  RESET_TODO_REQUEST: (state, action) => {
    return modifyTodo(state, {
      when: todo => todo.objectId === action.todo.objectId,
      then: todo => merge(todo, {isUpdating: true})
    });
  },
  RESET_TODO_SUCCESS: (state, action) => {
    return modifyTodo(state, {
      when: todo => todo.objectId === action.todo.objectId,
      then: todo => merge(todo, {isUpdating: false}, action.todo)
    });
  }
});

function rootReducer(state = {loading: false, todos: []}, action) {
  switch (action.type) {
    case FETCH_TODOS_REQUEST:
    case FETCH_TODOS_SUCCESS:
      return fetchTodos(state, action);
    break;

    case SAVE_TODO_REQUEST:
    case SAVE_TODO_SUCCESS:
      return saveTodo(state, action);
    break;

    case COMPLETE_TODO_REQUEST:
    case COMPLETE_TODO_SUCCESS:
      return completeTodo(state, action);
    break;

    case RESET_TODO_REQUEST:
    case RESET_TODO_SUCCESS:
      return resetTodo(state, action);
    break;

    default:
      return state;
    break;
  }
}

export default rootReducer;
