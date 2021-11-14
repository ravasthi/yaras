import { addGlobalSetting, addSettingForPage } from 'app/actions/settings';

import {
  mapDispatchToProps,
  mapStateToProps,
} from 'app/pages/typeface-previewer/ConnectedTypefacePreviewer';

describe('ConnectedTypefacePreviewer', () => {
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
          typefacePreviewer: {
            snippetName: 'tale-of-two-cities',
          },
        },
      });

      expect(props.family).toBe('Averta Std');
      expect(props.snippetName).toBe('tale-of-two-cities');
    });

    it('should handle when there are no settings for the page', () => {
      const props = mapStateToProps({
        settings: {
          family: 'Averta Std',
        },
      });

      expect(props.family).toBe('Averta Std');
      expect(props.snippetName).toBeUndefined();
    });
  });

  describe('mapDispatchToProps', () => {
    let props;

    beforeEach(() => {
      props = mapDispatchToProps(mockDispatch);
    });

    it('should return an object of the right form', () => {
      expect(props.onUpdateFamily).toBeFunction();
      expect(props.onUpdateText).toBeFunction();
    });

    it('should call dispatch when onUpdateFamily is invoked', () => {
      props.onUpdateFamily('Brix Slab');

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith(
        addGlobalSetting('family', 'Brix Slab')
      );
    });

    it('should call dispatch when onUpdateText is invoked', () => {
      props.onUpdateText('scandal-in-bohemia');

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith(
        addSettingForPage(
          'typefacePreviewer',
          'snippetName',
          'scandal-in-bohemia'
        )
      );
    });
  });
});
