import {
  addGlobalSetting,
  addSettingForPage,
  removeGlobalSetting,
  removeSettingForPage,
} from 'actions/settings';

import settingsReducer from 'reducers/settings';

describe('reducers for settings', () => {
  let priorStateEmpty;
  let priorStateWithGlobalSettings;
  let priorStateWithPageSettings;
  let priorStateWithGlobalAndPageSettings;

  beforeAll(() => {
    priorStateEmpty = {};

    priorStateWithGlobalSettings = {
      foo: 'baz',
      theme: 'blue',
    };

    priorStateWithPageSettings = {
      FontWeightPreviewer: {
        family: 'Helvetica Neue',
      },
      typefacePreviewer: {
        snippetName: 'scandal-in-bohemia',
        family: 'Helvetica Neue',
      },
    };

    priorStateWithGlobalAndPageSettings = {
      family: 'Helvetica Neue',
      typefacePreviewer: {
        snippetName: 'scandal-in-bohemia',
      },
    };
  });

  describe('adding a global setting', () => {
    it('should properly create a new global setting', () => {
      const newState = settingsReducer(
        priorStateEmpty,
        addGlobalSetting('foo', 'bar')
      );

      expect(newState).toEqual({
        foo: 'bar',
      });
    });

    it('should use the default prior state if none is supplied', () => {
      const newState = settingsReducer(
        undefined,
        addGlobalSetting('foo', 'bar')
      );

      expect(newState).toEqual({
        foo: 'bar',
      });
    });

    it('should correctly override existing settings', () => {
      const newState = settingsReducer(
        priorStateWithGlobalSettings,
        addGlobalSetting('foo', 'bar')
      );

      expect(newState).toEqual({
        foo: 'bar',
        theme: 'blue',
      });
    });

    it('should return the prior state if either of the parameters is missing or empty', () => {
      const newState1 = settingsReducer(
        priorStateWithGlobalSettings,
        addGlobalSetting('', 'bar')
      );

      const newState2 = settingsReducer(
        priorStateWithGlobalSettings,
        addGlobalSetting(undefined, 'bar')
      );

      const newState3 = settingsReducer(
        priorStateWithGlobalSettings,
        addGlobalSetting('foo', '')
      );

      const newState4 = settingsReducer(
        priorStateWithGlobalSettings,
        addGlobalSetting('foo', undefined)
      );

      expect(newState1).toEqual(priorStateWithGlobalSettings);
      expect(newState2).toEqual(priorStateWithGlobalSettings);
      expect(newState3).toEqual(priorStateWithGlobalSettings);
      expect(newState4).toEqual(priorStateWithGlobalSettings);
    });
  });

  describe('removing a global setting', () => {
    it('should properly remove an existing global setting', () => {
      const newState = settingsReducer(
        priorStateWithGlobalSettings,
        removeGlobalSetting('theme')
      );

      expect(newState).toEqual({
        foo: 'baz',
      });
    });

    it('should use the default prior state if none is supplied', () => {
      const newState = settingsReducer(undefined, removeGlobalSetting('theme'));

      expect(newState).toEqual(priorStateEmpty);
    });

    it('should return the prior state if the setting name is missing or empty', () => {
      const newState1 = settingsReducer(
        priorStateWithGlobalSettings,
        removeGlobalSetting('')
      );

      const newState2 = settingsReducer(
        priorStateWithGlobalSettings,
        removeGlobalSetting(undefined)
      );

      expect(newState1).toEqual(priorStateWithGlobalSettings);
      expect(newState2).toEqual(priorStateWithGlobalSettings);
    });

    it('should return the prior state if the setting name does not exist in settings', () => {
      const newState = settingsReducer(
        priorStateWithGlobalSettings,
        removeGlobalSetting('blah')
      );

      expect(newState).toEqual(priorStateWithGlobalSettings);
    });
  });

  describe('adding a page setting', () => {
    it('should properly create a new page setting', () => {
      const newState = settingsReducer(
        priorStateEmpty,
        addSettingForPage('FontWeightPreviewer', 'family', 'Georgia')
      );

      expect(newState).toEqual({
        FontWeightPreviewer: {
          family: 'Georgia',
        },
      });
    });

    it('should use the default prior state if none is supplied', () => {
      const newState = settingsReducer(
        undefined,
        addSettingForPage('FontWeightPreviewer', 'family', 'Georgia')
      );

      expect(newState).toEqual({
        FontWeightPreviewer: {
          family: 'Georgia',
        },
      });
    });

    it('should correctly override existing settings', () => {
      const newState = settingsReducer(
        priorStateWithPageSettings,
        addSettingForPage('FontWeightPreviewer', 'family', 'Georgia')
      );

      expect(newState).toEqual({
        FontWeightPreviewer: {
          family: 'Georgia',
        },
        typefacePreviewer: {
          snippetName: 'scandal-in-bohemia',
          family: 'Helvetica Neue',
        },
      });
    });

    it('should return the prior state if any of the parameters is missing or empty', () => {
      const newState1 = settingsReducer(
        priorStateWithPageSettings,
        addSettingForPage('', 'family', 'Georgia')
      );

      const newState2 = settingsReducer(
        priorStateWithPageSettings,
        addSettingForPage(undefined, 'family', 'Georgia')
      );

      const newState3 = settingsReducer(
        priorStateWithPageSettings,
        addSettingForPage('FontWeightPreviewer', '', 'Georgia')
      );

      const newState4 = settingsReducer(
        priorStateWithPageSettings,
        addSettingForPage('FontWeightPreviewer', null, 'Georgia')
      );

      const newState5 = settingsReducer(
        priorStateWithPageSettings,
        addSettingForPage('FontWeightPreviewer', 'family', '')
      );

      const newState6 = settingsReducer(
        priorStateWithPageSettings,
        addSettingForPage('FontWeightPreviewer', 'family', undefined)
      );

      expect(newState1).toEqual(priorStateWithPageSettings);
      expect(newState2).toEqual(priorStateWithPageSettings);
      expect(newState3).toEqual(priorStateWithPageSettings);
      expect(newState4).toEqual(priorStateWithPageSettings);
      expect(newState5).toEqual(priorStateWithPageSettings);
      expect(newState6).toEqual(priorStateWithPageSettings);
    });
  });

  describe('removing a page setting', () => {
    it('should properly remove an existing page setting', () => {
      const newState = settingsReducer(
        priorStateWithGlobalAndPageSettings,
        removeSettingForPage('typefacePreviewer', 'snippetName')
      );

      expect(newState).toEqual({
        family: 'Helvetica Neue',
        typefacePreviewer: {},
      });
    });

    it('should use the default prior state if none is supplied', () => {
      const newState = settingsReducer(
        undefined,
        removeSettingForPage('typefacePreviewer', 'snippetName')
      );

      expect(newState).toEqual(priorStateEmpty);
    });

    it('should return the prior state if the page or setting name is missing or empty', () => {
      const newState1 = settingsReducer(
        priorStateWithGlobalAndPageSettings,
        removeSettingForPage('', 'snippetName')
      );

      const newState2 = settingsReducer(
        priorStateWithGlobalAndPageSettings,
        removeSettingForPage(undefined, 'snippetName')
      );

      const newState3 = settingsReducer(
        priorStateWithGlobalAndPageSettings,
        removeSettingForPage('typefacePreviewer', '')
      );

      const newState4 = settingsReducer(
        priorStateWithGlobalAndPageSettings,
        removeSettingForPage('typefacePreviewer', null)
      );

      expect(newState1).toEqual(priorStateWithGlobalAndPageSettings);
      expect(newState2).toEqual(priorStateWithGlobalAndPageSettings);
      expect(newState3).toEqual(priorStateWithGlobalAndPageSettings);
      expect(newState4).toEqual(priorStateWithGlobalAndPageSettings);
    });

    it('should return the prior state if the page or setting name do not exist in settings', () => {
      const newState1 = settingsReducer(
        priorStateWithGlobalAndPageSettings,
        removeSettingForPage('FontWeightPreviewer', 'snippetName')
      );

      const newState2 = settingsReducer(
        priorStateWithGlobalAndPageSettings,
        removeSettingForPage('FontWeightPreviewer', 'oohdelally')
      );

      expect(newState1).toEqual(priorStateWithGlobalAndPageSettings);
      expect(newState2).toEqual(priorStateWithGlobalAndPageSettings);
    });
  });
});
