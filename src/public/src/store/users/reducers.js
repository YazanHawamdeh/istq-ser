import { UPDATE_USER_DATA, GET_LIST_OF_USERS, CREATE_NEW_USER, DELETE_USER, USER_LOGIN, USER_LOGOUT } from './actionsTypes';

const initialState = { list: [], _id: null, username: null, token: null };

const USERS_STORE = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_LIST_OF_USERS:
      return { ...state, list: payload, total: 0 };
    case CREATE_NEW_USER:
      return { ...state, list: [...state.list, payload], total: 0 };
    case DELETE_USER:
      return { ...state, list: state.list.filter((item) => item._id !== payload), total: 0 };
    case UPDATE_USER_DATA:
      return { ...state, list: state.list.map((item) => (item._id == payload._id ? { ...payload } : item)), total: 0 };
    case USER_LOGIN:
      localStorage.setItem('authUser', JSON.stringify({ ...payload }));
      return { ...state, ...payload };
    case USER_LOGOUT:
      localStorage.removeItem('authUser');
      return { ...state, list: [], _id: null, username: null, token: null };
    default:
      return state;
  }
};

export default USERS_STORE;
