import {
  ADD_GLOBAL_SETTING,
  ADD_SETTING_FOR_PAGE,
  addGlobalSetting,
  addSettingForPage,
  REMOVE_GLOBAL_SETTING,
  REMOVE_SETTING_FOR_PAGE,
  removeGlobalSetting,
  removeSettingForPage
} from 'actions/settings';

describe('actions for settings', () => {
  it('should create the correct action for adding a global setting', () => {
    expect(addGlobalSetting('family', 'Helvetica Neue')).toEqual({
      type: ADD_GLOBAL_SETTING,
      payload: {
        name: 'family',
        value: 'Helvetica Neue'
      }
    });
  });

  it('should create the correct action for removing a global setting', () => {
    expect(removeGlobalSetting('family')).toEqual({
      type: REMOVE_GLOBAL_SETTING,
      payload: {
        name: 'family'
      }
    });
  });

  it('should create the correct action for adding a page setting', () => {
    expect(addSettingForPage('typefacePreviewer', 'family', 'Avenir')).toEqual({
      type: ADD_SETTING_FOR_PAGE,
      payload: {
        name: 'family',
        page: 'typefacePreviewer',
        value: 'Avenir'
      }
    });
  });

  it('should create the correct action for removing a page setting', () => {
    expect(removeSettingForPage('typefacePreviewer', 'family')).toEqual({
      type: REMOVE_SETTING_FOR_PAGE,
      payload: {
        name: 'family',
        page: 'typefacePreviewer'
      }
    });
  });
});
