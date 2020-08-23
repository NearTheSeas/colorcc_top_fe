import { categoryProps } from '@/modules/category';
import { tagProps } from '@/modules/tag';
import api from '@/utils/api';
import Qs from 'qs';

export interface articleProps {
  id?: number;
  title: string;
  date?: Date | string;
  tags: tagProps[];
  description: string;
  category: categoryProps;
  content: string;
}

export interface artileListProps {
  dataSource: articleProps[];
}

export default {
  getArticle: (params?: any) => api.get(`/article/find`, { params }),
  fetchAll: (params?: any) =>
    api.get(`/article/list?${Qs.stringify(params, { arrayFormat: 'repeat' })}`),
  add: (params: articleProps) =>
    api.post(`/article/put`, Qs.stringify(params, { arrayFormat: 'repeat' })),
  delete: (params: articleProps) => api.get(`/article/delete`, { params }),
};
