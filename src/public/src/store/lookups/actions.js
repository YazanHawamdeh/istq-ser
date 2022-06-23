import { apis } from './apis';
import { CREATE_NEW_LOOKUP, GET_ALL_LOOKUPS, DELETE_LOOKUP, UPDATE_LOOKUP, UPDATE_LOOKUP_SETTINGS } from './actionsTypes';

export const createLookup = (data) => (dispatch) =>
  apis.create(data).then((res) => (res.isSuccess ? dispatch({ type: CREATE_NEW_LOOKUP, payload: res.data, isSuccess: true }) : res));

export const listLookups = () => (dispatch) =>
  apis.list().then((res) => (res.isSuccess ? dispatch({ type: GET_ALL_LOOKUPS, payload: res.data, isSuccess: true }) : res));

export const updateLookup = (data) => (dispatch) =>
  apis.update(data).then((res) => (res.isSuccess ? dispatch({ type: UPDATE_LOOKUP, payload: data, isSuccess: true }) : res));

export const deleteLookup = (data) => (dispatch) =>
  apis.delete(data._id).then((res) => (res.isSuccess ? dispatch({ type: DELETE_LOOKUP, payload: data, isSuccess: true }) : res));

export const updateSettingLookup = (data) => (dispatch) =>
  apis.updateSetting(data).then((res) => (res.isSuccess ? dispatch({ type: UPDATE_LOOKUP_SETTINGS, payload: data, isSuccess: true }) : res));
