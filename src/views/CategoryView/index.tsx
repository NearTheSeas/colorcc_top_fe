import React, { ReactElement, useState, useEffect } from 'react';
import article from '@/modules/article';
import ArticleList from '@/components/ArticleList';
import { Tabs } from 'antd';
const { TabPane } = Tabs;

interface Props {}

export default function CategoryView({}: Props): ReactElement {
  const [articleList, setArticleList] = useState([
    {
      id: 1,
      title: '文章标题1',
      date: '2020-8-16',
      tags: ['标签1', '标签2', '标签3', '标签4'],
      content:
        '超长的文章内容超长的文章内容超长的文章内容超长的文章内容超长的文章内容超长的文章内容超长的文章内容超长的文章内容超长的文章内容超长的文章内容超长的文章内容超长的文章内容超长的文章内容超长的文章内容超长的文章内容超长的文章内容超长的文章内容超长的文章内容',
      category: '分类1',
    },
    {
      id: 2,
      title: '文章标题2',
      date: '2020-8-16',
      tags: ['标签1', '标签4'],
      content: 'wenzhangneirong',
      category: '分类2',
    },
    {
      id: 3,
      title: '文章标题2',
      date: '2020-8-16',
      tags: ['标签1', '标签4'],
      content: 'wenzhangneirong',
      category: '分类2',
    },
    {
      id: 4,
      title: '文章标题2',
      date: '2020-8-16',
      tags: ['标签1', '标签4'],
      content: 'wenzhangneirong',
      category: '分类2',
    },
    {
      id: 5,
      title: '文章标题2',
      date: '2020-8-16',
      tags: ['标签1', '标签4'],
      content: 'wenzhangneirong',
      category: '分类2',
    },
    {
      id: 6,
      title: '文章标题2',
      date: '2020-8-16',
      tags: ['标签1', '标签4'],
      content: 'wenzhangneirong',
      category: '分类2',
    },
    {
      id: 7,
      title: '文章标题2',
      date: '2020-8-16',
      tags: ['标签1', '标签4'],
      content: 'wenzhangneirong',
      category: '分类2',
    },
    {
      id: 8,
      title: '文章标题2',
      date: '2020-8-16',
      tags: ['标签1', '标签4'],
      content: 'wenzhangneirong',
      category: '分类2',
    },
  ]);

  const getArtileList = async () => {
    let result = await article.getArtileList();
    setArticleList(result.data || []);
  };

  const tabChange = (category: string) => {
    console.log('查找对应分类下的数据')
  };

  useEffect(() => {
    getArtileList();
  }, []);

  return (
    <div className={['container'].join(' ')}>
      <Tabs centered size="large" defaultActiveKey="1" onChange={tabChange}>
        <TabPane tab="分类1" key="1"></TabPane>
        <TabPane tab="分类2" key="2"></TabPane>
        <TabPane tab="分类3" key="3"></TabPane>
      </Tabs>
      <ArticleList dataSource={articleList} />
    </div>
  );
}
