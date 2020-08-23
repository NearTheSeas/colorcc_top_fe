import React, { ReactElement } from 'react';
import ArticleItem from '../ArticleItem';
import { articleProps } from '@/modules/article';
import { Row, Col } from 'antd';
import styles from './index.module.less';

interface Props {
  columns?: number;
  dataSource: articleProps[];
}

export default function AtricleList({
  dataSource,
  ...props
}: Props): ReactElement {
  const { columns = 2 } = props;
  const span = 24 / columns;
  return (
    <div className={styles.atricle_list_wrapper}>
      <Row gutter={12}>
        {dataSource.map((article: articleProps) => (
          <Col span={span} key={article.id}>
            <ArticleItem key={article.id} {...article} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
