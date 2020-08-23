import React, { ReactElement, useState, useEffect } from 'react';
import { Table, Space, Modal, Form, Input, Button, message } from 'antd';
import categoryApi, { categoryProps } from '@/modules/category';

const { Column } = Table;
const { confirm } = Modal;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const tailLayout = {
  wrapperCol: { span: 24 },
};

export default function ManageCategory(): ReactElement {
  // const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [currentCate, setCurrentCate] = useState({});

  const onSubmit = async (values: any) => {
    let {
      data: { status, message: msg },
    } = await categoryApi.put({ ...currentCate, ...values });
    if (status === 200) {
      message.success(msg);
      await fetchAllCategories();
      form.resetFields();
      setVisible(false);
    }
  };

  const fetchAllCategories = async () => {
    let {
      data: { data: categories },
    } = await categoryApi.fetchAll();
    setCategories(categories);
  };

  const deleteTag = (category: categoryProps) => {
    confirm({
      title: '删除分类',
      content: `确认删除分类——${category.name}`,
      onOk: async () => {
        let {
          data: { message: msg },
        } = await categoryApi.delete(category);
        message.success(msg);
        await fetchAllCategories();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const editCategory = (category: categoryProps) => {
    setCurrentCate(category);
    setVisible(true);
    form.setFieldsValue({
      ...category,
    });
  };

  const onCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  return (
    <div>
      <div style={{ padding: '10px 0', textAlign: 'right' }}>
        <Button type="primary" onClick={() => setVisible(true)}>
          添加分类
        </Button>
      </div>
      <Table dataSource={categories} rowKey="id" pagination={false}>
        <Column title="分类名称" dataIndex="name" key="name" />
        <Column title="文章数" dataIndex="articles" key="articles" />
        <Column
          width={150}
          title="Action"
          dataIndex="Action"
          key="Action"
          render={(text: any, record: any) => (
            <Space size="middle">
              <Button
                size="small"
                type="link"
                onClick={() => editCategory(record)}
              >
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
        title="Category"
        visible={visible}
        onCancel={onCancel}
        destroyOnClose
        footer={false}
      >
        <Form
          {...layout}
          name="cate"
          form={form}
          initialValues={{ remember: true }}
          onFinish={onSubmit}
        >
          <Form.Item
            label="分类名称"
            name="name"
            rules={[{ required: true, message: 'Please input name!' }]}
          >
            <Input autoComplete="off" />
          </Form.Item>
          <Form.Item {...tailLayout} style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
