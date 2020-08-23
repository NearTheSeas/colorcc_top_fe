import React, { ReactElement, useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import marked from 'marked';
import { debounce } from 'lodash';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/theme/material.css';
import categoryApi, { categoryProps } from '@/modules/category';
import tagApi, { tagProps } from '@/modules/tag';
import articleApi from '@/modules/article';

import styles from './EditArticle.module.less';

import {
  Row,
  Col,
  Select,
  Input,
  Form,
  Collapse,
  Button,
  Space,
  message,
} from 'antd';

const { Option } = Select;
const { Panel } = Collapse;

export default function EditArticle(): ReactElement {
  const [markdownCode, setMarkdownCode] = useState('');
  const [previewCode, setPreviewCode] = useState('');
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [article, setArticle] = useState([]);
  const [form] = Form.useForm();
  const history = useHistory();
  const { id } = useParams();

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };
  const endItemLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 21 },
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

  const fetchArticle = async () => {
    let {
      data: { data },
    } = await articleApi.getArticle({ id });
    setArticle(data);
    const { title, description, category, tags, content } = data;
    form.setFieldsValue({
      title,
      description,
      content,
      category: category.id,
      tags: tags.map((tag: any) => tag.id),
    });
    codeChange(content);
  };

  const codeChange = debounce((value: string) => {
    setMarkdownCode(value);
    setPreviewCode(marked(value));
  }, 5);

  const handleSubmit = async (values: any) => {
    const { title, tags, description, category } = values;

    let {
      data: { status, message: msg },
    } = await articleApi.add({
      ...article,
      title,
      tags,
      description,
      category,
      content: markdownCode,
    });
    if (status === 200) {
      message.success(msg);
      history.push('/admin');
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  useEffect(() => {
    fetchAllCategories();
    fetchAllTags();
    if (id) {
      fetchArticle();
    }
  }, []);

  return (
    <div className={styles.article_wrapper}>
      <div>
        <Collapse bordered={false} defaultActiveKey={['info']}>
          <Panel header="Article Info" key="info">
            <Form {...formItemLayout} form={form} onFinish={handleSubmit}>
              <Row>
                <Col span={8}>
                  <Form.Item
                    label="标题"
                    name="title"
                    rules={[{ required: true, message: '请输入标题!' }]}
                  >
                    <Input placeholder="请输入标题" autoComplete="off" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="分类"
                    name="category"
                    rules={[{ required: true, message: '请选择分类!' }]}
                  >
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
                <Col span={8}>
                  <Form.Item
                    label="标签"
                    name="tags"
                    rules={[{ required: true, message: '请选择标签!' }]}
                  >
                    <Select placeholder="请选择标签" mode="multiple">
                      {tags.map((tag: tagProps) => (
                        <Option key={tag.id} lable={tag.name} value={tag.id}>
                          {tag.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    {...endItemLayout}
                    label="摘要"
                    name="description"
                    rules={[
                      { required: true, message: '请输入摘要!'},
                      {max:50, message: '不能超过50个字!'}
                    ]}
                  >
                    <Input.TextArea
                      placeholder="请输入摘要"
                      autoComplete="off"
                    />
                  </Form.Item>
                </Col>
                <Col span={24} style={{ textAlign: 'right' }}>
                  <Space>
                    <Button size="small" onClick={onReset}>
                      Reset
                    </Button>
                    <Button type="primary" size="small" htmlType="submit">
                      Submit
                    </Button>
                  </Space>
                </Col>
              </Row>
            </Form>
          </Panel>
        </Collapse>
      </div>
      <Row gutter={12}>
        <Col span={12}>
          <div className={styles.article_edirot}>
            <CodeMirror
              value={markdownCode}
              options={{
                mode: 'markdown',
                theme: 'material',
              }}
              onBeforeChange={(editor, data, value) => {
                codeChange(value);
              }}
              onChange={(editor, data, value) => {
                // setMarkdownCode(value);
              }}
            />
          </div>
        </Col>
        <Col span={12}>
          <div className={styles.article_render}>
            <iframe title="prview" id="preview_iframe" srcDoc={previewCode} />
          </div>
        </Col>
      </Row>
    </div>
  );
}
