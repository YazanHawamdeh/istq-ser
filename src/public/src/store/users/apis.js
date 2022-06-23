import Axios from 'axios';

export const apis = {
  create: (data) => Axios.post('apis/users', data),
  login: (data) => Axios.post('apis/users/login', data),
  list: () => Axios.get('apis/users'),
  delete: (id) => Axios.delete(`apis/users/${id}`),
  update: (id, data) => Axios.put(`apis/users/${id}`, data),
};
