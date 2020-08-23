import React, { ReactElement } from 'react';
import { Tabs } from 'antd';
import ManageArticle from './ManageArticle';
import ManageTag from './ManageTag';
import ManageCategory from './ManageCategory';

const { TabPane } = Tabs;

export default function Admin(): ReactElement {
  const tabPaneChange = () => {};

  return (
    <div className={['container'].join(' ')}>
      <Tabs defaultActiveKey="1" onChange={tabPaneChange}>
        <TabPane tab="文章管理" key="1">
          <ManageArticle />
        </TabPane>
        <TabPane tab="分类管理" key="2">
          <ManageCategory />
        </TabPane>
        <TabPane tab="标签管理" key="3">
          <ManageTag />
        </TabPane>
      </Tabs>
    </div>
  );
}
