import { apis } from './apis';
import { CREATE_NEW_REQUEST, GET_LIST_OF_REQUESTS, DELETE_REQUEST, UPDATE_REQUEST, UPDATE_REQUEST_STATUS } from './actionsTypes';
import { UPDATE_REQUEST_DCE, GET_REQUEST_LOGS, UPDATE_REQUEST_STATUS_ACC, GET_LIST_OF_DONE_REQUESTS } from './actionsTypes';
export const createRequest = (data) => (dispatch) =>
  apis.create(data).then((res) => (res.isSuccess ? dispatch({ type: CREATE_NEW_REQUEST, payload: res.data, isSuccess: true }) : res));

export const listRequests = (data) => (dispatch) =>
  apis.list(data).then((res) => (res.isSuccess ? dispatch({ type: GET_LIST_OF_REQUESTS, payload: res.data, isSuccess: true }) : res));

export const listDoneRequests = (data) => (dispatch) =>
  apis.listDoneOrders(data).then((res) => (res.isSuccess ? dispatch({ type: GET_LIST_OF_DONE_REQUESTS, payload: res.data, isSuccess: true }) : res));

export const deleteRequest = (data) => (dispatch) =>
  apis.delete(data).then((res) => (res.isSuccess ? dispatch({ type: DELETE_REQUEST, payload: res.data, isSuccess: true }) : res));

export const updateRequest = (id, data) => (dispatch) =>
  apis.update(id, data).then((res) => (res.isSuccess ? dispatch({ type: UPDATE_REQUEST, payload: res.data, isSuccess: true }) : res));

export const updateRequestStatus = (data) => (dispatch) =>
  apis.updateStatus(data).then((res) => (res.isSuccess ? dispatch({ type: UPDATE_REQUEST_STATUS, payload: res.data, isSuccess: true }) : res));

export const updateRequestStatusAcc = (data) => (dispatch) =>
  apis.updateStatus(data).then((res) => (res.isSuccess ? dispatch({ type: UPDATE_REQUEST_STATUS_ACC, payload: data, isSuccess: true }) : res));

export const getRequestLogs = (data) => (dispatch) =>
  apis.requestLogs(data).then((res) => (res.isSuccess ? dispatch({ type: GET_REQUEST_LOGS, payload: res.data, isSuccess: true }) : res));

export const updateRequestForDce = (data) => (dispatch) => {
  return apis
    .updateDce(data.id, data)
    .then((res) => (res.isSuccess ? dispatch({ type: UPDATE_REQUEST_DCE, payload: res.data, isSuccess: true }) : res));
};
