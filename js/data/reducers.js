import {
  FETCH_TODOS_REQUEST,
  FETCH_TODOS_SUCCESS,
  CREATE_TODO_REQUEST,
  CREATE_TODO_SUCCESS,
  UPDATE_TODO_REQUEST,
  UPDATE_TODO_SUCCESS
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

function sameRecord(a, b) {
  return a.objectId === b.objectId;
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

const fetchTodos = handleActions({
  FETCH_TODOS_REQUEST: (state) => {
    return merge(state, {loading: true});
  },
  FETCH_TODOS_SUCCESS: (state, action) => {
    return merge(state, {
      loading: false, 
      todos: action.json.results
    });
  }
});

const createTodo = handleActions({
  CREATE_TODO_REQUEST: (state, action) => {
    return merge(state, {pendingTodo: action.todo});
  },
  CREATE_TODO_SUCCESS: (state, action) => {
    let newTodo = merge(state.pendingTodo, action.json);
    return merge(state, {
      todos: [...state.todos, newTodo],
      pendingTodo: null
    });
  }
});

const updateTodo = handleActions({
  UPDATE_TODO_REQUEST: (state, action) => {
    return modifyTodo(state, {
      when: todo => sameRecord(todo, action.todo),
      then: todo => merge(todo, {isUpdating: true})
    });
  },
  UPDATE_TODO_SUCCESS: (state, action) => {
    return modifyTodo(state, {
      when: todo => sameRecord(todo, action.todo),
      then: todo => merge(todo, {isUpdating: false}, action.todo)
    });
  }
});

function rootReducer(state = {loading: false, todos: []}
  , action) {
  switch (action.type) {
    case FETCH_TODOS_REQUEST:
    case FETCH_TODOS_SUCCESS:
      return fetchTodos(state, action);
    break;

    case CREATE_TODO_REQUEST:
    case CREATE_TODO_SUCCESS:
      return createTodo(state, action);
    break;

    case UPDATE_TODO_REQUEST:
    case UPDATE_TODO_SUCCESS:
      return updateTodo(state, action);
    break;

    default:
      return state;
    break;
  }
}

export default rootReducer;
