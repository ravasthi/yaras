import {
  autoRehydrate,
  persistStore,
} from 'redux-persist';
import {
  applyMiddleware,
  combineReducers,
  createStore,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import localForage from 'localforage';
import settingsReducer from 'reducers/settings';
import thunk from 'redux-thunk';

let reducer;
let store;

function initReducer() {
  return combineReducers({
    settings: settingsReducer,
  });
}

function initStore(applicationReducer) {
  return createStore(
    applicationReducer, {},
    /* istanbul ignore next */
    composeWithDevTools(
      applyMiddleware(thunk),
      autoRehydrate(/* { log: true } */)
    )
  );
}

function persistApplicationStore(applicationStore) {
  persistStore(applicationStore, {
    storage: localForage,
    keyPrefix: 'yaras:',
  });
}

function getReducer() {
  if (!reducer) {
    reducer = initReducer();
  }

  return reducer;
}

function getStore() {
  if (!store) {
    store = initStore(getReducer());
    persistApplicationStore(store);
  }

  return store;
}

export {
  initReducer,
  initStore,
  getReducer,
  getStore,
  persistApplicationStore,
};
