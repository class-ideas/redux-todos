import ReactDom from 'react-dom';
import React from 'react';

import { Provider } from 'react-redux';

import {saveTodo, fetchTodos} from './data/actions';
import store from './data';

import App from './app';

// let unsubscribe = store.subscribe(() =>
//   console.log('state change:', store.getState())
// );

store.dispatch(fetchTodos());

ReactDom.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.querySelector('.react-wrapper')
);
