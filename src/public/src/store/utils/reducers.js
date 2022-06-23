import { TOGGLE_LOADER, SHOW_ERROR_ALERT, SHOW_SUCCESS_ALERT, HIDE_ALERT } from './actionsTypes';

const initialState = { loader: false, alert: false, success: false, alertMsg: '' };

const UTILS_STORE = (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_LOADER:
      return { ...state, loader: !state.loader };

    case SHOW_SUCCESS_ALERT:
      return { ...state, alert: true, success: true, alertMsg: payload };

    case SHOW_ERROR_ALERT:
      return { ...state, alert: true, success: false, alertMsg: payload };

    case HIDE_ALERT:
      return { ...state, alert: false, alertMsg: '' };

    default:
      return state;
  }
};

export default UTILS_STORE;
