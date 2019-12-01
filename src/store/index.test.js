import * as storeModule from 'store';

describe('Redux store utilities', () => {
  let mockInitStore;
  let spyGetReducer;
  let spyInitReducer;
  let spyPersistApplicationStore;

  beforeEach(() => {
    spyGetReducer = jest.spyOn(storeModule, 'getReducer');
    spyInitReducer = jest.spyOn(storeModule, 'initReducer');
    mockInitStore = jest
      .spyOn(storeModule, 'initStore')
      .mockImplementation(() => {});
    spyPersistApplicationStore = jest
      .spyOn(storeModule, 'persistApplicationStore')
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
      let store = storeModule.getStore();

      expect(spyGetReducer).toHaveBeenCalledTimes(1);
      expect(spyInitReducer).toHaveBeenCalledTimes(1);
      expect(mockInitStore).toHaveBeenCalledTimes(1);
      expect(spyPersistApplicationStore).toHaveBeenCalledTimes(1);

      /*
       ** And when calling it twice, expect none of the other functions
       ** to get called again.
       */
      store = storeModule.getStore();

      expect(spyGetReducer).toHaveBeenCalledTimes(1);
      expect(spyInitReducer).toHaveBeenCalledTimes(1);
      expect(mockInitStore).toHaveBeenCalledTimes(1);
      expect(spyPersistApplicationStore).toHaveBeenCalledTimes(1);

      /*
       ** Finally, when calling getReducer a second time, expect that initReducer isn't called
       ** as well.
       */
      storeModule.getReducer();

      expect(spyInitReducer).toHaveBeenCalledTimes(1);
    });
  });
});
