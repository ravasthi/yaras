import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistCombineReducers, persistStore } from 'redux-persist';

import localForage from 'localforage';
import settingsReducer from 'app/reducers/settings.js';
import thunk from 'redux-thunk';

function initReducer() {
  const persistenceSettings = {
    storage: localForage,
    keyPrefix: 'yaras:',
    key: 'state',
  };

  return persistCombineReducers(persistenceSettings, {
    settings: settingsReducer,
  });
}

function initStore(applicationReducer) {
  /* istanbul ignore next */
  return createStore(
    applicationReducer,
    {},
    composeWithDevTools(applyMiddleware(thunk))
  );
}

function persistApplicationStore(applicationStore) {
  return persistStore(applicationStore);
}

export { initReducer, initStore, persistApplicationStore };
