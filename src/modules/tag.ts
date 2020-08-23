import api from '@/utils/api';
import Qs from 'qs';

export interface tagProps {
  id: number;
  name: string;
}

export interface tagListProps {
  dataSource: tagProps[];
}

export default {
  fetchAll: (params?: any) => api.get('/tag/list', { params }),
  put: (params: tagProps) => api.post(`/tag/put`, Qs.stringify(params)),
  delete: (params: tagProps) => api.get(`/tag/delete`, { params }),
};
