import { apis } from './apis';
import { DELETE_USER, GET_LIST_OF_USERS, UPDATE_USER_DATA, CREATE_NEW_USER, USER_LOGIN, USER_LOGOUT } from './actionsTypes';

export const getListOfUsers = () => (dispatch) =>
  apis.list().then((res) => {
    if (res.isSuccess) return dispatch({ type: GET_LIST_OF_USERS, payload: res.data });
  });

export const createUser = (data) => (dispatch) =>
  apis.create(data).then((res) => (res.isSuccess ? dispatch({ type: CREATE_NEW_USER, payload: res.data, isSuccess: true }) : res));

export const deleteUser = (data) => (dispatch) =>
  apis.delete(data).then((res) => (res.isSuccess ? dispatch({ type: DELETE_USER, payload: res.data, isSuccess: true }) : res));

export const updateUser = (id, data) => (dispatch) =>
  apis.update(id, data).then((res) => (res.isSuccess ? dispatch({ type: UPDATE_USER_DATA, payload: { _id: id, ...data }, isSuccess: true }) : res));

export const loginUser = (data) => (dispatch) =>
  apis.login(data).then((res) => (res.isSuccess ? dispatch({ type: USER_LOGIN, payload: res.data, isSuccess: true }) : res));

export const logoutUser = () => (dispatch) => dispatch({ type: USER_LOGOUT });
