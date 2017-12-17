import {
  applyMiddleware,
  createStore,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  persistCombineReducers,
  persistStore,
} from 'redux-persist';

import localForage from 'localforage';
import settingsReducer from 'reducers/settings';
import thunk from 'redux-thunk';

let reducer;
let store;
let persistor;

function initReducer() {
  const persistenceSettings = {
    storage: localForage,
    keyPrefix: 'yaras:',
    key: 'state',
  };

  return persistCombineReducers(
    persistenceSettings,
    {
      settings: settingsReducer,
    }
  );
}

function initStore(applicationReducer) {
  /* istanbul ignore next */
  return createStore(
    applicationReducer, {},
    composeWithDevTools(
      applyMiddleware(thunk),
    )
  );
}

function persistApplicationStore(applicationStore) {
  return persistStore(applicationStore);
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
    persistor = persistApplicationStore(store);
  }

  return { persistor, store };
}

export {
  initReducer,
  initStore,
  getReducer,
  getStore,
  persistApplicationStore,
};
