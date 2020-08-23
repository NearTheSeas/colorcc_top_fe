import api from '@/utils/api';
import Qs from 'qs';

export interface categoryProps {
  id: number;
  name: string;
}

export interface categoryListProps {
  dataSource: categoryProps[];
}

export default {
  fetchAll: (params?: any) => api.get('/category/list', { params }),
  put: (params: categoryProps) =>
    api.post(`/category/put`, Qs.stringify(params)),
  delete: (params: categoryProps) => api.get(`/category/delete`, { params }),
};
