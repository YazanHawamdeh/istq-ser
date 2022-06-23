import { CREATE_NEW_STOCK, GET_LIST_OF_STOCKS, REMOVE_STOCK, UPDATE_STOCK, LIST_FOR_APPROVAL, LIST_OF_NOTIFICATIONS } from './actionsTypes';
import { NEW_AMOUNT_APPROVED } from './actionsTypes';
const initialState = { list: [], total: 0, max: 100, stockForApprove: [], notifications: [] };

const STOCK_STORE = (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_NEW_STOCK:
      return { ...state, list: [payload, ...state.list], total: state.total + 1 };
    case GET_LIST_OF_STOCKS:
      return { ...state, list: payload.list, total: payload.total, max: payload.max };
    case REMOVE_STOCK:
      return { ...state, list: state.list.filter((item) => item._id !== payload), total: state.total - 1 };
    case UPDATE_STOCK:
      return { ...state, list: state.list.map((item) => (item._id == payload._id ? { ...payload } : item)) };
    case LIST_FOR_APPROVAL:
      return { ...state, stockForApprove: payload };
    case NEW_AMOUNT_APPROVED:
      return { ...state, stockForApprove: state.stockForApprove.filter((item) => item._id !== payload), total: state.total - 1 };
    case LIST_OF_NOTIFICATIONS:
      return { ...state, notifications: payload };
    default:
      return state;
  }
};

export default STOCK_STORE;
