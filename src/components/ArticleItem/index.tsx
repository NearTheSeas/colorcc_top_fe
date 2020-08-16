import React, { ReactElement } from 'react';
import styles from './index.module.less';
import { Card, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { ArticleProps } from '@/modules/article';

const { Meta } = Card;

export default function ArticleItem({
  id = 1,
  title = '默认标题',
  date = '2020-8-16',
  tags = ['标签1', '标签2', '标签3'],
  category = '默认分类',
}: ArticleProps): ReactElement {
  return (
    <div className={styles.atricle_item_wrapper}>
      <Link to={`/article/${id}`}>
        <Card
          hoverable
          title={category}
          extra={<Link to="/">More</Link>}
          actions={[
            <div className={styles.article_item_tags_wrapper}>
              {tags.map((tag) => (
                <Tag color="#55acee">{tag}</Tag>
              ))}
            </div>,
          ]}
        >
          <Meta title={title} description={date} />
        </Card>
      </Link>
    </div>
  );
}
