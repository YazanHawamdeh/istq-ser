import Axios from 'axios';

export const apis = {
  create: (data) => Axios.post('apis/stock', data),
  list: (data) => Axios.get('apis/stock', { params: data }),
  delete: (id) => Axios.delete(`apis/stock/${id}`),
  update: (id, data) => Axios.put(`apis/stock/${id}`, data),
  updateStockAmountForDce: (id, data) => Axios.put(`apis/stock/dce-amount/${id}`, data),
  listStockForApprove: () => Axios.get(`apis/stock/approve`),
  approveStockAmount: (data) => Axios.post(`apis/stock/approve`, data),
  listStockNotifications: () => Axios.get('apis/stock/amountLimit'),
};
