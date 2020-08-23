import axios from 'axios';
import { message } from 'antd';

const instance = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
});

// 添加请求拦截器
instance.interceptors.request.use(
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
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    if (response.status !== 200) {
      switch (response.code) {
        case 401:
          message.warn(response.message);
          break;
        default:
          message.warn(response.message);
      }
      return Promise.reject(response);
    }
    if (response.data.status !== 200) {
      window.location.href = '/';
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
