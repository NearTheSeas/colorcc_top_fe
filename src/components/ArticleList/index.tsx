import React, { ReactElement } from 'react';
import ArticleItem from '../ArticleItem';
import { ArtileListProps } from '@/modules/article';
import { Row, Col } from 'antd';
import styles from './index.module.less';

interface Props extends ArtileListProps {
  columns?: number;
}

export default function AtricleList({
  dataSource,
  ...props
}: Props): ReactElement {
  const { columns = 2 } = props;
  const span = 24 / columns;
  return (
    <div className={styles.atricle_list_wrapper} {...props}>
      <Row gutter={12}>
        {dataSource.map((article) => (
          <Col span={span}>
            <ArticleItem {...article} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
