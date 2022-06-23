import Axios from 'axios';

export const apis = {
  create: (data) => Axios.post('apis/orders', data),
  list: (data) => Axios.get('apis/orders', { params: data }),
  listDoneOrders: (data) => Axios.get('apis/done-orders', { params: data }),
  delete: (id) => Axios.delete(`apis/orders/${id}`),
  update: (id, data) => Axios.put(`apis/orders/${id}`, data),
  updateDce: (id, data) => Axios.put(`apis/orders/dce/${id}`, data),
  updateStatus: (data) => Axios.patch(`apis/orders`, data),
  requestLogs: (id) => Axios.get(`apis/orders/${id}`),
};
