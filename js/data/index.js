import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
 
// Create a store with thunk middleware and reducer
const store = applyMiddleware(thunk)(createStore)(reducer);

export default store;
