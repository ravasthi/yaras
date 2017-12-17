import {
  cleanUpTests,
  initTests,
} from 'lib/testCommon';
import {
  getReducer,
  getStore,
  initReducer,
  persistApplicationStore,
  __RewireAPI__ as StoreRewireAPI,
} from 'store';

describe('Redux store utilities', () => {
  let sandbox;
  let initReducerSpy;
  let initStoreStub;
  let getReducerSpy;
  let persistApplicationStoreSpy;
  let persistStoreStub;

  before(() => {
    initTests();
    sandbox = sinon.sandbox.create();
  });

  beforeEach(() => {
    getReducerSpy = sinon.spy(getReducer);
    initReducerSpy = sinon.spy(initReducer);
    initStoreStub = sinon.stub().returns({});
    persistApplicationStoreSpy = sinon.spy(persistApplicationStore);
    persistStoreStub = sinon.stub();
  });

  afterEach(() => {
    getReducerSpy.reset();
    initReducerSpy.reset();
    initStoreStub.reset();
    persistApplicationStoreSpy.reset();
    persistStoreStub.reset();
  });

  after(() => {
    sandbox.restore();
    cleanUpTests();
  });

  describe('creating a store', () => {
    it('should do the right sequence of things', () => {
      /* eslint-disable no-underscore-dangle */
      StoreRewireAPI.__Rewire__('getReducer', getReducerSpy);
      StoreRewireAPI.__Rewire__('initReducer', initReducerSpy);
      StoreRewireAPI.__Rewire__('initStore', initStoreStub);
      StoreRewireAPI.__Rewire__('persistApplicationStore', persistApplicationStoreSpy);
      StoreRewireAPI.__Rewire__('persistStore', persistStoreStub);
      /* eslint-enable no-underscore-dangle */

      // eslint-disable-next-line no-unused-vars
      let store = getStore();

      expect(getReducerSpy.callCount).to.equal(1);
      expect(initReducerSpy.callCount).to.equal(1);
      expect(initStoreStub.callCount).to.equal(1);
      expect(persistApplicationStoreSpy.callCount).to.equal(1);

      /*
      ** And when calling it twice, expect none of the other functions
      ** to get called again.
      */
      store = getStore();

      expect(getReducerSpy.callCount).to.equal(1);
      expect(initReducerSpy.callCount).to.equal(1);
      expect(initStoreStub.callCount).to.equal(1);
      expect(persistApplicationStoreSpy.callCount).to.equal(1);

      /*
      ** Finally, when calling getReducer a second time, expect that initReducer isn't called
      ** as well.
      */
      getReducer();

      expect(initReducerSpy.callCount).to.equal(1);

      /* eslint-disable no-underscore-dangle */
      StoreRewireAPI.__ResetDependency__('getReducer');
      StoreRewireAPI.__ResetDependency__('initReducer');
      StoreRewireAPI.__ResetDependency__('initStore');
      StoreRewireAPI.__ResetDependency__('persistApplicationStore');
      StoreRewireAPI.__ResetDependency__('persistStore');
      /* eslint-enable no-underscore-dangle */
    });
  });
});
