import Axios from 'axios';

export const apis = {
  create: (data) => Axios.post('apis/lookups', data),
  list: () => Axios.get('apis/lookups'),
  delete: (id) => Axios.delete(`apis/lookups/${id}`),
  update: (data) => Axios.put(`apis/lookups/${data._id}`, { label: data.label }),
  updateSetting: (data) => Axios.put(`apis/lookups/settings`, data),
};
