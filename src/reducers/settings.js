import { handleActions } from 'redux-actions';
import { isUndefinedOrEmpty } from 'app/lib/common';

import _ from 'lodash';

const settingsReducer = handleActions(
  {
    ADD_GLOBAL_SETTING: (state, action) => {
      if (
        isUndefinedOrEmpty(action.payload.name) ||
        isUndefinedOrEmpty(action.payload.value)
      ) {
        return state;
      }

      return _.merge({}, state, {
        [action.payload.name]: action.payload.value,
      });
    },

    ADD_SETTING_FOR_PAGE: (state, action) => {
      if (
        isUndefinedOrEmpty(action.payload.page) ||
        isUndefinedOrEmpty(action.payload.name) ||
        isUndefinedOrEmpty(action.payload.value)
      ) {
        return state;
      }

      return _.merge({}, state, {
        [action.payload.page]: {
          [action.payload.name]: action.payload.value,
        },
      });
    },

    REMOVE_GLOBAL_SETTING: (state, action) => {
      if (isUndefinedOrEmpty(action.payload.name)) {
        return state;
      }

      if (state[action.payload.name]) {
        delete state[action.payload.name];
      }

      return _.merge({}, state);
    },

    REMOVE_SETTING_FOR_PAGE: (state, action) => {
      if (
        isUndefinedOrEmpty(action.payload.page) ||
        isUndefinedOrEmpty(action.payload.name)
      ) {
        return state;
      }

      if (
        state[action.payload.page] &&
        state[action.payload.page][action.payload.name]
      ) {
        delete state[action.payload.page][action.payload.name];
      }

      return _.merge({}, state);
    },
  },
  {}
);

export default settingsReducer;
