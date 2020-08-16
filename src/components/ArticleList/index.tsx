import React, { ReactElement } from 'react';
import ArticleItem from '../ArticleItem';
import { ArtileListProps } from '@/modules/article';
import { Row, Col } from 'antd';
import styles from './index.module.less';

export default function AtricleList({
  dataSource,
  ...props
}: ArtileListProps): ReactElement {
  return (
    <div className={styles.atricle_list_wrapper} {...props}>
      <Row gutter={12}>
        {dataSource.map((article) => (
          <Col span={12}>
            <ArticleItem {...article} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
