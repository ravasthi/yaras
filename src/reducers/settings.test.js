import {
  addGlobalSetting,
  addSettingForPage,
  removeGlobalSetting,
  removeSettingForPage,
} from 'actions/settings';

import {
  cleanUpTests,
  initTests,
} from 'lib/testCommon';

import {
  isUndefinedOrEmpty,
  settingsReducer,
} from 'reducers/settings';

describe.only('reducers for settings', () => {
  let priorStateEmpty;
  let priorStateWithGlobalSettings;
  let priorStateWithPageSettings;
  let priorStateWithGlobalAndPageSettings;

  before(() => {
    initTests();

    priorStateEmpty = {
      settings: {},
    };

    priorStateWithGlobalSettings = {
      settings: {
        foo: 'baz',
        theme: 'blue',
      },
    };

    priorStateWithPageSettings = {
      settings: {
        fontWeightTester: {
          family: 'Helvetica Neue',
        },
        typefaceTester: {
          snippet: 'scandal-in-bohemia',
          family: 'Helvetica Neue',
        },
      },
    };

    priorStateWithGlobalAndPageSettings = {
      settings: {
        family: 'Helvetica Neue',
        typefaceTester: {
          snippet: 'scandal-in-bohemia',
        },
      },
    };
  });

  after(() => {
    cleanUpTests();
  });

  describe('isUndefinedOrEmpty', () => {
    it('should return false for a defined value of any kind', () => {
      expect(isUndefinedOrEmpty(1)).to.be.false();
      expect(isUndefinedOrEmpty('hello')).to.be.false();
      expect(isUndefinedOrEmpty({ hello: 'Gutentag' })).to.be.false();
    });

    it('should return false if the value is 0', () => {
      expect(isUndefinedOrEmpty(0)).to.be.false();
    });

    it('should return true for an undefined value', () => {
      expect(isUndefinedOrEmpty(undefined)).to.be.true();
    });

    it('should return true for a null value', () => {
      expect(isUndefinedOrEmpty(null)).to.be.true();
    });

    it('should return true for an empty string', () => {
      expect(isUndefinedOrEmpty('')).to.be.true();
    });

    it('should return true for an empty object', () => {
      expect(isUndefinedOrEmpty({})).to.be.true();
    });
  });

  describe('adding a global setting', () => {
    it('should properly create a new global setting', () => {
      const newState = settingsReducer(priorStateEmpty, addGlobalSetting('foo', 'bar'));

      expect(newState).to.deep.equal({
        settings: {
          foo: 'bar',
        },
      });
    });

    it('should use the default prior state if none is supplied', () => {
      const newState = settingsReducer(undefined, addGlobalSetting('foo', 'bar'));

      expect(newState).to.deep.equal({
        settings: {
          foo: 'bar',
        },
      });
    });

    it('should correctly override existing settings', () => {
      const newState = settingsReducer(
        priorStateWithGlobalSettings,
        addGlobalSetting('foo', 'bar')
      );

      expect(newState).to.deep.equal({
        settings: {
          foo: 'bar',
          theme: 'blue',
        },
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

      expect(newState1).to.deep.equal(priorStateWithGlobalSettings);
      expect(newState2).to.deep.equal(priorStateWithGlobalSettings);
      expect(newState3).to.deep.equal(priorStateWithGlobalSettings);
      expect(newState4).to.deep.equal(priorStateWithGlobalSettings);
    });
  });

  describe('removing a global setting', () => {
    it('should properly remove an existing global setting', () => {
      const newState = settingsReducer(priorStateWithGlobalSettings, removeGlobalSetting('theme'));

      expect(newState).to.deep.equal({
        settings: {
          foo: 'baz',
        },
      });
    });

    it('should use the default prior state if none is supplied', () => {
      const newState = settingsReducer(undefined, removeGlobalSetting('theme'));

      expect(newState).to.deep.equal(priorStateEmpty);
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

      expect(newState1).to.deep.equal(priorStateWithGlobalSettings);
      expect(newState2).to.deep.equal(priorStateWithGlobalSettings);
    });

    it('should return the prior state if the setting name does not exist in settings', () => {
      const newState = settingsReducer(
        priorStateWithGlobalSettings,
        removeGlobalSetting('blah')
      );

      expect(newState).to.deep.equal(priorStateWithGlobalSettings);
    });
  });

  describe('adding a page setting', () => {
    it('should properly create a new page setting', () => {
      const newState = settingsReducer(
        priorStateEmpty, addSettingForPage('fontWeightTester', 'family', 'Georgia')
      );

      expect(newState).to.deep.equal({
        settings: {
          fontWeightTester: {
            family: 'Georgia',
          },
        },
      });
    });

    it('should use the default prior state if none is supplied', () => {
      const newState = settingsReducer(
        undefined, addSettingForPage('fontWeightTester', 'family', 'Georgia')
      );

      expect(newState).to.deep.equal({
        settings: {
          fontWeightTester: {
            family: 'Georgia',
          },
        },
      });
    });

    it('should correctly override existing settings', () => {
      const newState = settingsReducer(
        priorStateWithPageSettings,
        addSettingForPage('fontWeightTester', 'family', 'Georgia')
      );

      expect(newState).to.deep.equal({
        settings: {
          fontWeightTester: {
            family: 'Georgia',
          },
          typefaceTester: {
            snippet: 'scandal-in-bohemia',
            family: 'Helvetica Neue',
          },
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
        addSettingForPage('fontWeightTester', '', 'Georgia')
      );

      const newState4 = settingsReducer(
        priorStateWithPageSettings,
        addSettingForPage('fontWeightTester', null, 'Georgia')
      );

      const newState5 = settingsReducer(
        priorStateWithPageSettings,
        addSettingForPage('fontWeightTester', 'family', '')
      );

      const newState6 = settingsReducer(
        priorStateWithPageSettings,
        addSettingForPage('fontWeightTester', 'family', undefined)
      );

      expect(newState1).to.deep.equal(priorStateWithPageSettings);
      expect(newState2).to.deep.equal(priorStateWithPageSettings);
      expect(newState3).to.deep.equal(priorStateWithPageSettings);
      expect(newState4).to.deep.equal(priorStateWithPageSettings);
      expect(newState5).to.deep.equal(priorStateWithPageSettings);
      expect(newState6).to.deep.equal(priorStateWithPageSettings);
    });
  });

  describe('removing a page setting', () => {
    it('should properly remove an existing page setting', () => {
      const newState = settingsReducer(
        priorStateWithGlobalAndPageSettings, removeSettingForPage('typefaceTester', 'snippet')
      );

      expect(newState).to.deep.equal({
        settings: {
          family: 'Helvetica Neue',
          typefaceTester: {},
        },
      });
    });

    it('should use the default prior state if none is supplied', () => {
      const newState = settingsReducer(
        undefined, removeSettingForPage('typefaceTester', 'snippet')
      );

      expect(newState).to.deep.equal(priorStateEmpty);
    });

    it('should return the prior state if the page or setting name is missing or empty', () => {
      const newState1 = settingsReducer(
        priorStateWithGlobalAndPageSettings,
        removeSettingForPage('', 'snippet')
      );

      const newState2 = settingsReducer(
        priorStateWithGlobalAndPageSettings,
        removeSettingForPage(undefined, 'snippet')
      );

      const newState3 = settingsReducer(
        priorStateWithGlobalAndPageSettings,
        removeSettingForPage('typefaceTester', '')
      );

      const newState4 = settingsReducer(
        priorStateWithGlobalAndPageSettings,
        removeSettingForPage('typefaceTester', null)
      );

      expect(newState1).to.deep.equal(priorStateWithGlobalAndPageSettings);
      expect(newState2).to.deep.equal(priorStateWithGlobalAndPageSettings);
      expect(newState3).to.deep.equal(priorStateWithGlobalAndPageSettings);
      expect(newState4).to.deep.equal(priorStateWithGlobalAndPageSettings);
    });

    it('should return the prior state if the page or setting name do not exist in settings', () => {
      const newState1 = settingsReducer(
        priorStateWithGlobalAndPageSettings,
        removeSettingForPage('fontWeightTester', 'snippet')
      );

      const newState2 = settingsReducer(
        priorStateWithGlobalAndPageSettings,
        removeSettingForPage('fontWeightTester', 'oohdelally')
      );

      expect(newState1).to.deep.equal(priorStateWithGlobalAndPageSettings);
      expect(newState2).to.deep.equal(priorStateWithGlobalAndPageSettings);
    });
  });
});
