import api from '@/utils/api';
import Qs from 'qs';

export interface props {
  username: string;
  password: string;
}

export default {
  login: (params: props) => api.post(`/user/login`, Qs.stringify(params)),
  logout: () => api.get(`/user/logout`),
};
