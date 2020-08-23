import React, { ReactElement, useState, useEffect } from 'react';
import './index.less';
import { useParams, Link } from 'react-router-dom';
import atricleApi, { articleProps } from '@/modules/article';
import { Tag } from 'antd';
import { CodeOutlined } from '@ant-design/icons';
import marked from 'marked';
import { tagProps } from '@/modules/tag';
import { categoryProps } from '@/modules/category';

export default function ArticleDetail(): ReactElement {
  let { id } = useParams();
  const [article, setArticle] = useState<articleProps>({
    title: '',
    category: {} as categoryProps,
    date: '',
    tags: [],
    content: '',
    description: '',
  });
  const { category } = article;
  const getArticle = async (id: number) => {
    let {
      data: { data },
    } = await atricleApi.getArticle({ id });
    setArticle(data);
  };
  useEffect(() => {
    getArticle(id);
  }, [id]);
  return (
    <div className="article_detail_wrapper">
      <div>
        <span className="article_date">{article.date}</span>
        <Link to={`/category/${category.name}`}>
          <span className="article_category">
            <CodeOutlined style={{ marginRight: 5 }} />
            {article.category.name}
          </span>
        </Link>
      </div>
      <h1 className="article_title">{article.title}</h1>
      <div id="articleContent">
        <iframe
          title="prview"
          id="preview_iframe"
          srcDoc={marked(article.content)}
        />
      </div>
      <div className="article_tag_wrapper">
        {article.tags?.length &&
          (article.tags as tagProps[]).map((tag: tagProps) => (
            <Tag key={tag.id} color="#55acee">
              {tag.name}
            </Tag>
          ))}
      </div>
    </div>
  );
}
