import React, { ReactElement, useState, useEffect } from 'react';
import article from '@/modules/article';
import ArticleList from '@/components/ArticleList';
import { Checkbox, Divider, Tag } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';

const CheckboxGroup = Checkbox.Group;
const { CheckableTag } = Tag;

interface Props {}

export default function TagView({}: Props): ReactElement {
  const [articleList, setArticleList] = useState([
    {
      id: 1,
      title: '文章标题1',
      date: '2020-8-16',
      tags: ['标签1', '标签2', '标签3', '标签4'],
      content:
        '超长的文章内容超长的文章内容超长的文章内容超长的文章内容超长的文章内容超长的文章内容超长的文章内容超长的文章内容超长的文章内容超长的文章内容超长的文章内容超长的文章内容超长的文章内容超长的文章内容超长的文章内容超长的文章内容超长的文章内容超长的文章内容',
      category: '分类1',
    },
    {
      id: 2,
      title: '文章标题2',
      date: '2020-8-16',
      tags: ['标签1', '标签4'],
      content: 'wenzhangneirong',
      category: '分类2',
    },
    {
      id: 3,
      title: '文章标题2',
      date: '2020-8-16',
      tags: ['标签1', '标签4'],
      content: 'wenzhangneirong',
      category: '分类2',
    },
    {
      id: 4,
      title: '文章标题2',
      date: '2020-8-16',
      tags: ['标签1', '标签4'],
      content: 'wenzhangneirong',
      category: '分类2',
    },
    {
      id: 5,
      title: '文章标题2',
      date: '2020-8-16',
      tags: ['标签1', '标签4'],
      content: 'wenzhangneirong',
      category: '分类2',
    },
    {
      id: 6,
      title: '文章标题2',
      date: '2020-8-16',
      tags: ['标签1', '标签4'],
      content: 'wenzhangneirong',
      category: '分类2',
    },
    {
      id: 7,
      title: '文章标题2',
      date: '2020-8-16',
      tags: ['标签1', '标签4'],
      content: 'wenzhangneirong',
      category: '分类2',
    },
    {
      id: 8,
      title: '文章标题2',
      date: '2020-8-16',
      tags: ['标签1', '标签4'],
      content: 'wenzhangneirong',
      category: '分类2',
    },
  ]);

  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  const [plainOptions, setPlainOptions] = useState(['Apple', 'Pear', 'Orange']);
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([
    'Apple',
    'Pear',
    'Orange',
  ]);

  const onChange = (checkedList: CheckboxValueType[]) => {
    setCheckedList(checkedList);
    setIndeterminate(
      !!checkedList.length && checkedList.length < plainOptions.length
    );
    setCheckAll(checkedList.length === plainOptions.length);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  const getArtileList = async () => {
    let result = await article.getArtileList();
    setArticleList(result.data || []);
  };

  useEffect(() => {
    getArtileList();
  }, []);

  return (
    <div className={['container'].join(' ')}>
      <div
        style={{
          padding: 10,
          marginBottom: 15,
          borderBottom: '1px solid #ddd',
        }}
      >
        <Checkbox
          indeterminate={indeterminate}
          onChange={onCheckAllChange}
          checked={checkAll}
        >
          全选
        </Checkbox>
        <Divider type="vertical" />
        <CheckboxGroup
          options={plainOptions}
          value={checkedList}
          onChange={onChange}
        />
      </div>
      <ArticleList dataSource={articleList} />
    </div>
  );
}
