import Axios from 'axios';
// Authorization': `Basic ${token}`
export const axiosConfig = () => {
  try {
    let user = localStorage.getItem('authUser');
    user = JSON.parse(user);
    if (Axios.defaults.baseURL === '/') return;
    Axios.defaults.baseURL = '/';
    Axios.interceptors.request.use(async (config) => {
      // * show loader for each api request
      // * handle form data
      if (config.data instanceof FormData) {
        Object.assign(config.headers);
        config.headers = { ...config.headers, Authorization: `${user?.token}` };
      } else {
        // * handle other requests
        let data = {
          ...config.data,
        };
        config.data = data;
        config.headers = { ...config.headers, Authorization: `${user?.token}` };
      }
      return config;
    });
    // * filter data from response
    Axios.interceptors.response.use(
      (response) => {
        // * hide loader after request
        if (response.data.status === 401) {
          localStorage.removeItem('authUser');
          window.location.href = '/login';
        }
        return response.data;
        // return { data: response.data, success: true };
      },
      (error) => {
        // * hide loader after request
        return error;
        // return { data: error.response.data, success: false, status: error.response.status };
      }
    );
  } catch (err) {
    console.log(err);
  }
};
