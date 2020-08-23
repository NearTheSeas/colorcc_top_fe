import React, { ReactElement } from 'react';
import styles from './index.module.less';
import { Card, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { articleProps } from '@/modules/article';

const { Meta } = Card;

const colorSet = ['#f44336', '#55acee', '#8bc34a', '#673ab7', '#ff9800'];

export default function ArticleItem({
  id,
  title,
  date,
  tags,
  description,
  category,
}: articleProps): ReactElement {
  return (
    <div className={styles.atricle_item_wrapper}>
      <Card
        hoverable
        extra={<Link to={`/category/${category.id}`}>{category.name}</Link>}
        actions={[
          <div className={styles.article_item_tags_wrapper}>
            {tags.map((tag, index) => (
              <Tag key={index} color={colorSet[index % colorSet.length]}>
                <Link to={`/tag/${tag.id}`} style={{ color: '#fff' }}>
                  {tag.name}
                </Link>
              </Tag>
            ))}
          </div>,
        ]}
      >
        <Meta
          title={<Link to={`/article/${id}`}>{title}</Link>}
          description={description}
        />
        <div className={styles.article_item_date}>{date}</div>
      </Card>
    </div>
  );
}
