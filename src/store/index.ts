import { createStore, applyMiddleware, Store } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import thunk from 'redux-thunk';

import rootReducer from './reducers';

let store: Store;

if (process.env.NODE_ENV === 'production') {
  store = createStore(rootReducer, applyMiddleware(thunk));
} else {
  store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
}

export default store;
