import * as initializers from 'app/store/initializers';

let reducer;
let store;
let persistor;
// eslint-disable-next-line import/no-mutable-exports
let storeGetters;

function getReducer() {
  if (!reducer) {
    // console.log('reducer not initialized');

    reducer = initializers.initReducer();
    // } else  {
    //   console.log('reducer exists!');
  }

  return reducer;
}

function getStore() {
  if (!store) {
    // console.log('store not initialized');

    store = initializers.initStore(storeGetters.getReducer());
    persistor = initializers.persistApplicationStore(store);
    // } else {
    //   console.log('store exists!');
  }

  return { persistor, store };
}

storeGetters = { getReducer, getStore };

export default storeGetters;
