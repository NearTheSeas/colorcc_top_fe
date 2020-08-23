import React, { ReactElement, useState, useEffect } from 'react';
import article from '@/modules/article';

import ArticleList from '@/components/ArticleList';
// import InfiniteScroll from 'react-infinite-scroller';

// interface Props {} {}: Props

export default function HomePage(): ReactElement {
  const [articleList, setArticleList] = useState([]);

  const getArtileList = async () => {
    let {
      data: { data },
    } = await article.fetchAll();
    setArticleList(data);
  };

  useEffect(() => {
    getArtileList();
  }, []);

  return (
    <div className={['container'].join(' ')}>
      <ArticleList dataSource={articleList} columns={1} />
    </div>
  );
}
