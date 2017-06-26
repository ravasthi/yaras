import { handleActions } from 'redux-actions';

import _ from 'lodash';

const settingsReducer = handleActions({
  ADD_GLOBAL_SETTING: (state, action) => (
    _.merge({}, state, {
      settings: {
        [action.payload.name]: action.payload.value,
      },
    })
  ),

  ADD_SETTING_FOR_PAGE: (state, action) => (
    _.merge({}, state, {
      settings: {
        [action.payload.page]: {
          [action.payload.name]: action.payload.value,
        }
      }
    })
  ),

  REMOVE_GLOBAL_SETTING: (state, action) => {
    if (state.settings[action.payload.name]) {
      delete state.settings[action.payload.name];
    }

    return _.merge({}, state);
  },

  REMOVE_SETTING_FOR_PAGE: (state, action) => {
    if (state.settings[action.payload.page] &&
        state.settings[action.payload.page][action.payload.name]) {
      delete state.settings[action.payload.page][action.payload.name];
    }

    return _.merge({}, state);
  },
}, { settings: {} });

export default settingsReducer;
