import { CREATE_NEW_REQUEST, GET_LIST_OF_REQUESTS, DELETE_REQUEST, UPDATE_REQUEST, UPDATE_REQUEST_STATUS } from './actionsTypes';
import { GET_REQUEST_LOGS, UPDATE_REQUEST_DCE, UPDATE_REQUEST_STATUS_ACC, GET_LIST_OF_DONE_REQUESTS } from './actionsTypes';

import { orderStatus } from '../../utils/constants';

const initialState = { list: [], total: 0, doneList: [], doneTotal: 0, logsList: [] };

const ORDERS_STORE = (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_NEW_REQUEST:
      return { ...state, list: [payload, ...state.list], total: state.total + 1 };
    case GET_LIST_OF_REQUESTS:
      return { ...state, list: payload.list, total: payload.total };
    case GET_LIST_OF_DONE_REQUESTS:
      return { ...state, doneList: payload.list, doneTotal: payload.total };
    case DELETE_REQUEST:
      return { ...state, list: state.list.filter((item) => item._id !== payload), total: state.total - 1 };
    case UPDATE_REQUEST_DCE:
      return { ...state, list: state.list.filter((item) => item._id !== payload), total: state.total - 1 };
    case UPDATE_REQUEST:
      return { ...state, list: state.list.map((item) => (item._id == payload._id ? { ...payload } : item)) };
    case UPDATE_REQUEST_STATUS:
      if (window.location.pathname.length <= 10) {
        return payload.status == orderStatus.DONE_WITH_COMMENT
          ? { ...state, list: state.list.filter((item) => item._id !== payload._id) }
          : { ...state, list: state.list.map((item) => (item._id == payload._id ? { ...payload } : item)) };
      } else {
        return payload.status !== orderStatus.DONE_WITH_COMMENT
          ? { ...state, doneList: state.doneList.filter((item) => String(item._id) !== String(payload._id)) }
          : { ...state, doneList: state.doneList.map((item) => (item._id == payload._id ? { ...payload } : item)) };
      }

    case UPDATE_REQUEST_STATUS_ACC:
      return { ...state, list: state.list.filter((item) => item._id !== payload.requestId) };
    case GET_REQUEST_LOGS:
      return { ...state, logsList: payload };
    default:
      return state;
  }
};

export default ORDERS_STORE;
