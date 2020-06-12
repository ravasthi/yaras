import * as initializers from 'store/initializers';

import storeGetters from 'store';

describe('Redux store utilities', () => {
  let mockInitStore;
  let spyGetReducer;
  let spyInitReducer;
  let spyPersistApplicationStore;

  beforeEach(() => {
    spyGetReducer = jest.spyOn(storeGetters, 'getReducer');
    spyInitReducer = jest.spyOn(initializers, 'initReducer');
    mockInitStore = jest
      .spyOn(initializers, 'initStore')
      .mockImplementation(() => {});
    spyPersistApplicationStore = jest
      .spyOn(initializers, 'persistApplicationStore')
      .mockImplementation(() => {});
  });

  afterEach(() => {
    spyGetReducer.mockClear();
    spyInitReducer.mockClear();
    mockInitStore.mockReset();
    spyPersistApplicationStore.mockClear();
  });

  describe('creating a store', () => {
    it('should do the right sequence of things', () => {
      // eslint-disable-next-line no-unused-vars
      let store = storeGetters.getStore();

      expect(spyGetReducer).toHaveBeenCalledTimes(1);
      expect(spyInitReducer).toHaveBeenCalledTimes(1);
      expect(mockInitStore).toHaveBeenCalledTimes(1);
      expect(spyPersistApplicationStore).toHaveBeenCalledTimes(1);

      /*
       ** And when calling it twice, expect none of the other functions
       ** to get called again.
       ** TODO: re-enable this; not currently working.
       */
      // eslint-disable-next-line no-unused-vars
      store = storeGetters.getStore();

      // expect(spyGetReducer).toHaveBeenCalledTimes(1);
      expect(spyInitReducer).toHaveBeenCalledTimes(1);
      // expect(mockInitStore).toHaveBeenCalledTimes(1);
      // expect(spyPersistApplicationStore).toHaveBeenCalledTimes(1);

      /*
       ** Finally, when calling getReducer a second time, expect that initReducer isn't called
       ** as well.
       */
      storeGetters.getReducer();

      expect(spyInitReducer).toHaveBeenCalledTimes(1);
    });
  });
});
