import { TOGGLE_LOADER, SHOW_SUCCESS_ALERT, SHOW_ERROR_ALERT, HIDE_ALERT } from './actionsTypes';

export const toggleLoader = () => (dispatch) => dispatch({ type: TOGGLE_LOADER });

export const showSuccessAlert = (data) => (dispatch) => dispatch({ type: SHOW_SUCCESS_ALERT, payload: data });

export const showErrorAlert = (data) => (dispatch) => dispatch({ type: SHOW_ERROR_ALERT, payload: data });

export const hideAlert = () => (dispatch) => dispatch({ type: HIDE_ALERT });
