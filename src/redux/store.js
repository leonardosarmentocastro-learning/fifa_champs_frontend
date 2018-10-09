import { createStore, combineReducers } from 'redux';

import * as reducers from './ducks';

const rootReducer = combineReducers(reducers);
const store = createStore(rootReducer,

  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
