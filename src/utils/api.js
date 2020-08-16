import axios from 'axios';
import { message } from 'antd';

const instance = axios.create({
    baseURL: '/api',
});

// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么

    return Promise.reject(error);
  }
);

// TODO: 相应拦截处理
axios.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    if (response.code !== 200) {
      switch (response.code) {
        case 401:
          message.warn(response.message);
          break;
        default:
          message.warn(response.message);
      }
      return Promise.reject(response);
    }

    return response;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default instance;
