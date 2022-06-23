import { apis } from './apis';
import { CREATE_NEW_STOCK, GET_LIST_OF_STOCKS, REMOVE_STOCK, UPDATE_STOCK } from './actionsTypes';
import { UPDATE_STOCK_AMOUNT_FOR_DCE, LIST_FOR_APPROVAL, NEW_AMOUNT_APPROVED, LIST_OF_NOTIFICATIONS } from './actionsTypes';

export const getListOfStock = (data) => (dispatch) => {
  return apis.list(data).then((res) => (res.isSuccess ? dispatch({ type: GET_LIST_OF_STOCKS, payload: res.data, isSuccess: true }) : res));
};

export const createStock = (data) => (dispatch) => {
  const formData = new FormData();

  formData.append('name', data.name);
  formData.append('image', data.image);
  formData.append('amount', data.amount);
  formData.append('description', data.description);
  formData.append('alertOn', data.alertOn);

  return apis.create(formData).then((res) => (res.isSuccess ? dispatch({ type: CREATE_NEW_STOCK, payload: res.data, isSuccess: true }) : res));
};

export const deleteStock = (id) => (dispatch) =>
  apis.delete(id).then((res) => (res.isSuccess ? dispatch({ type: REMOVE_STOCK, payload: res.data, isSuccess: true }) : res));

export const updateStock = (id, data) => (dispatch) => {
  const formData = new FormData();

  if (data.name) formData.append('name', data.name);
  if (data.image) formData.append('image', data.image);
  if (data.amount) formData.append('amount', data.amount);
  if (data.alertOn) formData.append('alertOn', data.alertOn);
  if (data.description) formData.append('description', data.description);

  return apis.update(id, formData).then((res) => (res.isSuccess ? dispatch({ type: UPDATE_STOCK, payload: res.data, isSuccess: true }) : res));
};

export const updateStockAmountForDce = (data) => (dispatch) =>
  apis.updateStockAmountForDce(data.id, data).then((res) => {
    return dispatch({ type: UPDATE_STOCK_AMOUNT_FOR_DCE, payload: res.isSuccess });
  });

export const listStockForApprove = () => (dispatch) =>
  apis.listStockForApprove().then((res) => (res.isSuccess ? dispatch({ type: LIST_FOR_APPROVAL, payload: res.data, isSuccess: true }) : res));

export const approveStockAmount = (data) => (dispatch) =>
  apis.approveStockAmount(data).then((res) => (res.isSuccess ? dispatch({ type: NEW_AMOUNT_APPROVED, payload: res.data, isSuccess: true }) : res));

export const listStockNotifications = () => (dispatch) =>
  apis.listStockNotifications().then((res) => (res.isSuccess ? dispatch({ type: LIST_OF_NOTIFICATIONS, payload: res.data, isSuccess: true }) : res));
