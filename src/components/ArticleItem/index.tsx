import React, { ReactElement } from 'react';
import styles from './index.module.less';
import { Card, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { ArticleProps } from '@/modules/article';

const { Meta } = Card;

const colorSet = [
  '#f44336',
  '#55acee',
  '#8bc34a',
  '#673ab7',
  '#ff9800',
];

export default function ArticleItem({
  id = 1,
  title = '默认标题',
  date = '2020-8-16',
  tags = ['标签1', '标签2', '标签3'],
  description = '作者又偷懒了，没有添加描述信息',
  category = '默认分类',
}: ArticleProps): ReactElement {
  return (
    <div className={styles.atricle_item_wrapper}>
      <Card
        hoverable
        // title={<Link to={`/article/${category}`}>{category}</Link>}
        extra={<Link to="/category">{category}</Link>}
        actions={[
          <div className={styles.article_item_tags_wrapper}>
            {tags.map((tag, index) => (
              <Tag color={colorSet[index % colorSet.length]}>
                <Link to={`/tag/${tag}`} style={{ color: '#fff' }}>
                  {tag}
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
