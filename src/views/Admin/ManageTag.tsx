import React, { ReactElement, useState, useEffect } from 'react';
import { Table, Space, Modal, Form, Input, Button, message } from 'antd';
import tagApi, { tagProps } from '@/modules/tag';

const { Column } = Table;
const { confirm } = Modal;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const tailLayout = {
  wrapperCol: { span: 24 },
};

export default function ManageTag(): ReactElement {
  // const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [currentTag, setCurrentTag] = useState({});

  const onSubmit = async (values: any) => {
    let {
      data: { status, message: msg },
    } = await tagApi.put({ ...currentTag, ...values });
    if (status === 200) {
      message.success(msg);
      await fetchAllTags();
      form.resetFields();
      setVisible(false);
    }
  };

  const fetchAllTags = async () => {
    let {
      data: { data: tags },
    } = await tagApi.fetchAll();
    setTags(tags);
  };

  const deleteTag = (tag: tagProps) => {
    confirm({
      title: '删除标签',
      content: `确认删除标签——${tag.name}`,
      onOk: async () => {
        let {
          data: { message: msg },
        } = await tagApi.delete(tag);
        message.success(msg);
        await fetchAllTags();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const editTag = (tag: tagProps) => {
    setCurrentTag(tag);
    setVisible(true);
    form.setFieldsValue({
      ...tag,
    });
  };

  useEffect(() => {
    fetchAllTags();
  }, []);

  return (
    <div>
      <div style={{ padding: '10px 0', textAlign: 'right' }}>
        <Button type="primary" onClick={() => setVisible(true)}>
          添加标签
        </Button>
      </div>
      <Table dataSource={tags} rowKey="id" pagination={false}>
        <Column title="标签名称" dataIndex="name" key="name" />
        <Column title="文章数" dataIndex="articles" key="articles" />
        <Column
          width={150}
          title="Action"
          dataIndex="Action"
          key="Action"
          render={(text: any, record: any) => (
            <Space size="middle">
              <Button size="small" type="link" onClick={() => editTag(record)}>
                Edit
              </Button>
              <Button
                size="small"
                type="link"
                onClick={() => deleteTag(record)}
              >
                Delete
              </Button>
            </Space>
          )}
        />
      </Table>
      <Modal
        title="Tag"
        visible={visible}
        onCancel={() => setVisible(false)}
        destroyOnClose
        footer={false}
      >
        <Form
          {...layout}
          name="tag"
          form={form}
          initialValues={{ remember: true }}
          onFinish={onSubmit}
        >
          <Form.Item
            label="标签名称"
            name="name"
            rules={[{ required: true, message: 'Please input name!' }]}
          >
            <Input autoComplete="off" />
          </Form.Item>
          <Form.Item {...tailLayout} style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit">
              submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
