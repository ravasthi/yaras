import { addGlobalSetting } from 'actions/settings';

import {
  mapDispatchToProps,
  mapStateToProps,
} from 'pages/font-weight-previewer/ConnectedFontWeightPreviewer';

describe('ConnectedFontWeightPreviewer', () => {
  let mockDispatch;

  beforeAll(() => {
    mockDispatch = jest.fn();
  });

  afterEach(() => {
    mockDispatch.mockClear();
  });

  describe('mapStateToProps', () => {
    it('should correctly extract the family setting from state', () => {
      const props = mapStateToProps({
        settings: {
          family: 'Averta Std',
        },
      });

      expect(props.family).toBe('Averta Std');
    });
  });

  describe('mapDispatchToProps', () => {
    let props;

    beforeEach(() => {
      props = mapDispatchToProps(mockDispatch);
    });

    it('should return an object of the right form', () => {
      expect(props.onUpdateFamily).toBeDefined();
      expect(props.onUpdateFamily).toBeFunction();
    });

    it('should call dispatch when onUpdateFamily is invoked', () => {
      props.onUpdateFamily('Brix Slab');

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith(
        addGlobalSetting('family', 'Brix Slab')
      );
    });
  });
});
