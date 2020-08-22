import React, { ReactElement } from 'react';
import { Tabs, Table, Tag, Space } from 'antd';

const { TabPane } = Tabs;
const { Column } = Table;

interface Props {}

const columnsArticle = [
  {
    title: 'Title',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Description',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Categorty',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (tags: any) => (
      <>
        {tags.map((tag: any) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text: any, record: any) => (
      <Space size="middle">
        <a>Edit </a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

export default function Admin({}: Props): ReactElement {
  const tabPaneChange = () => {};
  return (
    <div className={['container'].join(' ')}>
      <Tabs defaultActiveKey="1" onChange={tabPaneChange}>
        <TabPane tab="文章管理" key="1">
          <div>
            <Table columns={columnsArticle} dataSource={data} />
          </div>
        </TabPane>
        <TabPane tab="分类管理" key="2">
          <Table dataSource={data}>
            <Column title="分类名称" dataIndex="name" key="name" />
            <Column title="文章数" dataIndex="age" key="age" />
            <Column
              width={100}
              title="Action"
              dataIndex="Action"
              key="Action"
              render={(text: any, record: any) => (
                <Space size="middle">
                  <a>Edit </a>
                </Space>
              )}
            />
          </Table>
        </TabPane>
        <TabPane tab="标签管理" key="3">
          <Table dataSource={data}>
            <Column title="标签名称" dataIndex="name" key="name" />
            <Column title="文章数" dataIndex="age" key="age" />
            <Column
              width={100}
              title="Action"
              dataIndex="Action"
              key="Action"
              render={(text: any, record: any) => (
                <Space size="middle">
                  <a>Edit </a>
                </Space>
              )}
            />
          </Table>
        </TabPane>
      </Tabs>
    </div>
  );
}
