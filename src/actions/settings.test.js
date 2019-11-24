import {
  ADD_GLOBAL_SETTING,
  ADD_SETTING_FOR_PAGE,
  addGlobalSetting,
  addSettingForPage,
  REMOVE_GLOBAL_SETTING,
  REMOVE_SETTING_FOR_PAGE,
  removeGlobalSetting,
  removeSettingForPage,
} from 'actions/settings';

import {
  cleanUpTests,
  initTests,
} from 'lib/testCommon';

describe('actions for settings', () => {
  before(() => {
    initTests();
  });

  after(() => {
    cleanUpTests();
  });

  it('should create the correct action for adding a global setting', () => {
    expect(addGlobalSetting('family', 'Helvetica Neue')).to.deep.equal({
      type: ADD_GLOBAL_SETTING,
      payload: {
        name: 'family',
        value: 'Helvetica Neue',
      },
    });
  });

  it('should create the correct action for removing a global setting', () => {
    expect(removeGlobalSetting('family')).to.deep.equal({
      type: REMOVE_GLOBAL_SETTING,
      payload: {
        name: 'family',
      },
    });
  });

  it('should create the correct action for adding a page setting', () => {
    expect(addSettingForPage('typefacePreviewer', 'family', 'Avenir')).to.deep.equal({
      type: ADD_SETTING_FOR_PAGE,
      payload: {
        name: 'family',
        page: 'typefacePreviewer',
        value: 'Avenir',
      },
    });
  });

  it('should create the correct action for removing a page setting', () => {
    expect(removeSettingForPage('typefacePreviewer', 'family')).to.deep.equal({
      type: REMOVE_SETTING_FOR_PAGE,
      payload: {
        name: 'family',
        page: 'typefacePreviewer',
      },
    });
  });
});
