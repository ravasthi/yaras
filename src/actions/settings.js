import { createAction } from 'redux-actions';

const ADD_GLOBAL_SETTING = 'ADD_GLOBAL_SETTING';
const ADD_SETTING_FOR_PAGE = 'ADD_SETTING_FOR_PAGE';
const REMOVE_GLOBAL_SETTING = 'REMOVE_GLOBAL_SETTING';
const REMOVE_SETTING_FOR_PAGE = 'REMOVE_SETTING_FOR_PAGE';

const addGlobalSetting = createAction(
  ADD_GLOBAL_SETTING,
  (name, value) => ({ name, value })
);

const removeGlobalSetting = createAction(
  REMOVE_GLOBAL_SETTING,
  name => ({ name })
);

const addSettingForPage = createAction(
  ADD_SETTING_FOR_PAGE,
  (name, page, value) => ({ name, page, value })
);

const removeSettingForPage = createAction(
  REMOVE_SETTING_FOR_PAGE,
  (name, page) => ({ name, page })
);

export {
  ADD_GLOBAL_SETTING,
  ADD_SETTING_FOR_PAGE,
  REMOVE_GLOBAL_SETTING,
  REMOVE_SETTING_FOR_PAGE,
  addGlobalSetting,
  removeGlobalSetting,
  addSettingForPage,
  removeSettingForPage,
};
