import api from '@/utils/api';

export interface ArticleProps {
  id: number;
  title: string;
  date: Date | string;
  tags?: string[];
  description?: string;
  category?: string;
  content?: string;
}

export interface ArtileListProps {
  dataSource: ArticleProps[];
}

export default {
  getArtileList: (params?: any) => api.get('/article/list', { params }),
  getArticle: (params?: any) => api.get(`/article/fandById`, { params }),
};
