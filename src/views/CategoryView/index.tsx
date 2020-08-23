import React, { ReactElement, useState, useEffect } from 'react';
import article from '@/modules/article';
import ArticleList from '@/components/ArticleList';
import { articleProps } from '@/modules/article';
import categoryApi, { categoryProps } from '@/modules/category';
import { Tabs } from 'antd';
const { TabPane } = Tabs;

export default function CategoryView(): ReactElement {
  const [currentPane, setCurrentPane] = useState('');
  const [articleList, setArticleList] = useState<articleProps[]>([]);
  const [categories, setCategories] = useState([]);

  const getArtileList = async (params: any) => {
    let {
      data: { data },
    } = await article.fetchAll(params);
    setArticleList(data);
  };

  const fetchAllCategories = async () => {
    let {
      data: { data: categories },
    } = await categoryApi.fetchAll();
    setCategories(categories);
    if (categories.length) {
      setCurrentPane(categories[0].id);
      getArtileList({ category: categories[0].id });
    }
  };

  const tabChange = (category: string) => {
    console.log('查找对应分类下的数据');
    setCurrentPane(category);
    getArtileList({ category: category });
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  return (
    <div className={['container'].join(' ')}>
      <Tabs
        centered
        size="large"
        defaultActiveKey={currentPane}
        onChange={tabChange}
      >
        {categories.map((category: categoryProps) => (
          <TabPane tab={category.name} key={category.id}></TabPane>
        ))}
      </Tabs>
      <ArticleList dataSource={articleList} />
    </div>
  );
}
