import {
  autoRehydrate,
  persistStore,
} from 'redux-persist';
import {
  combineReducers,
  createStore,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import localForage from 'localforage';
import settingsReducer from 'reducers/settings';

let reducer;
let store;

function initReducer() {
  console.log('in initReducer');
  return combineReducers({
    settings: settingsReducer,
  });
}

function initStore(applicationReducer) {
  console.log('in initStore');
  return createStore(
    applicationReducer, {},
    /* istanbul ignore next */
    composeWithDevTools(
      autoRehydrate()
    )
  );
}

function persistApplicationStore(applicationStore) {
  console.log('in persistApplicationStore');
  persistStore(applicationStore, { storage: localForage });
}

function getReducer() {
  console.log('in getReducer');
  if (!reducer) {
    console.log('creating reducer');
    reducer = initReducer();
  }

  return reducer;
}

function getStore() {
  console.log('in getStore');
  if (!store) {
    console.log('creating store');
    store = initStore(getReducer());
    persistApplicationStore(store, { keyPrefix: 'yaras' });
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
