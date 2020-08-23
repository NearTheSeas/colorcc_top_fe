import React, { ReactElement, useState, useEffect } from 'react';
import {
  Table,
  Space,
  Modal,
  Row,
  Col,
  Select,
  Form,
  Input,
  Button,
  message,
  Tag,
  DatePicker,
} from 'antd';
import articleApi, { articleProps } from '@/modules/article';
import categoryApi, { categoryProps } from '@/modules/category';
import tagApi, { tagProps } from '@/modules/tag';
import { Link } from 'react-router-dom';

const { Column } = Table;
const { confirm } = Modal;
const { Option } = Select;
const { RangePicker } = DatePicker;

export default function ManageArticle(): ReactElement {
  // const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  // const [visible, setVisible] = useState(false);
  const onSubmit = async (values: any) => {
    console.log(values);
    const { date, ...others } = values;
    let [start, end] = date;
    console.log(start.format('YYYY-MM-DD HH:mm:ss'));
    fetchAllArticle({
      ...others,
      date_from: start.format('YYYY-MM-DD HH:mm:ss'),
      date_to: end.format('YYYY-MM-DD HH:mm:ss'),
    });
  };

  const fetchAllCategories = async () => {
    let {
      data: { data: categories },
    } = await categoryApi.fetchAll();
    setCategories(categories);
  };

  const fetchAllTags = async () => {
    let {
      data: { data: tags },
    } = await tagApi.fetchAll();
    setTags(tags);
  };

  const fetchAllArticle = async (values?: any) => {
    let {
      data: { data: articles },
    } = await articleApi.fetchAll(values);
    setArticles(articles);
  };

  const deleteTag = (article: articleProps) => {
    confirm({
      title: '删除文章',
      content: `确认删除文章——${article.title}`,
      onOk: async () => {
        let {
          data: { message: msg },
        } = await articleApi.delete(article);
        message.success(msg);
        await fetchAllArticle();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const onReset = () => {
    form.resetFields();
    fetchAllArticle();
  };

  useEffect(() => {
    fetchAllCategories();
    fetchAllTags();
    fetchAllArticle();
  }, []);
  return (
    <div>
      <div style={{ padding: '10px 0', textAlign: 'right' }}>
        <div>
          <Form {...formItemLayout} form={form} onFinish={onSubmit}>
            <Row>
              <Col span={6}>
                <Form.Item label="标题" name="title">
                  <Input placeholder="请输入标题" autoComplete="off" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="分类" name="category">
                  <Select placeholder="请选择分类">
                    {categories.map((category: categoryProps) => (
                      <Option
                        key={category.id}
                        lable={category.name}
                        value={category.id}
                      >
                        {category.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="标签" name="tags">
                  <Select placeholder="请选择标签" mode="multiple">
                    {tags.map((tag: tagProps) => (
                      <Option key={tag.id} lable={tag.name} value={tag.id}>
                        {tag.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="日期" name="date">
                  <RangePicker />
                </Form.Item>
              </Col>
              <Col span={24} style={{ textAlign: 'right' }}>
                <Space>
                  <Button type="primary" size="small" htmlType="submit">
                    Search
                  </Button>
                  <Button size="small" onClick={onReset}>
                    Reset
                  </Button>
                  <Link to="/admin/editarticle">
                    <Button size="small" type="primary">
                      添加文章
                    </Button>
                  </Link>
                </Space>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
      <Table dataSource={articles} rowKey="id">
        <Column title="Title" dataIndex="title" key="title" />
        <Column title="Description" dataIndex="description" key="description" />
        <Column
          title="Categorty"
          dataIndex="category"
          key="category"
          render={(category) => <span>{category.name}</span>}
        />
        <Column
          title="Tags"
          dataIndex="tags"
          key="tags"
          render={(tags: any) => (
            <>
              {tags.map((tag: any) => {
                return <Tag key={tag.id}>{tag.name.toUpperCase()}</Tag>;
              })}
            </>
          )}
        />
        <Column
          width={150}
          title="Action"
          dataIndex="Action"
          key="Action"
          render={(text: any, record: any) => (
            <Space size="middle">
              <Link to={`/admin/editarticle/${record.id}`}>
                <Button size="small" type="link">
                  Edit
                </Button>
              </Link>
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
    </div>
  );
}
